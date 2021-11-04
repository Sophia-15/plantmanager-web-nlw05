import React, {
  createContext, ReactNode, useEffect, useState,
} from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

interface AuthContextProps {
  user: string
  login: (name: string) => void
  isAuthenticated: boolean
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  useEffect(() => {
    const nameLocalStorage = localStorage.getItem('@plantmanager:user');

    const username = nameLocalStorage ? (JSON.parse(nameLocalStorage)) : '';

    if (username) {
      setIsAuthenticated(true);
      setUser(username);
      history.push('/myplants');
    }
  }, []);

  function login(name: string) {
    if (!name) {
      toast.error('Coloque seu nome!');
      return;
    }

    localStorage.setItem('@plantmanager:user', JSON.stringify(name));
    setUser(name);
    setIsAuthenticated(true);
    history.push('/myplants');
  }

  return (
    <AuthContext.Provider value={{ user, login, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}
