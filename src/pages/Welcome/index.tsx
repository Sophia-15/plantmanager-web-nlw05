import React, { useState } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import illustration from '../../assets/ilustra.svg';
import { useAuth } from '../../hooks/useAuth';

import './styles.scss';

export function Welcome() {
  const [username, setUsername] = useState('');
  const { login } = useAuth();

  return (
    <div className="welcome-page">
      <section className="plant-manager-info">
        <h1>Gerencie suas plantas de forma fácil</h1>
        <img src={illustration} alt="Ilustração regando as plantas" />
        <p>
          Não esqueça mais de regar suas plantas. Nós cuidamos de lembrar você
          sempre que precisar.
        </p>
      </section>
      <section className="user-info">
        <span>🤔</span>
        <p>Como podemos chamar você?</p>
        <input type="text" placeholder="Digite seu nome" onChange={(e) => setUsername(e.target.value)} />
        <button type="button" onClick={() => login(username)}>Confirmar</button>
      </section>
      <ToastContainer
        style={{ fontSize: '17px' }}
      />
    </div>
  );
}
