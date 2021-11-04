import React from 'react';
import {
  BrowserRouter as Router, Switch, Route, RouteProps, Redirect,
} from 'react-router-dom';
import { AuthProvider } from './contexts/authContext';
import { useAuth } from './hooks/useAuth';
import { MyPlants } from './pages/MyPlants';
import { NewPlant } from './pages/NewPlant';
import { SavePlant } from './pages/SavePlant';

import { Welcome } from './pages/Welcome';

interface CustomRoutesProps extends RouteProps {
  isPrivate?: boolean
}

function CustomRoute({ isPrivate, ...rest }: CustomRoutesProps) {
  const { isAuthenticated } = useAuth();

  if (isPrivate && !isAuthenticated) {
    return <Redirect to="/" />;
  }

  return <Route {...rest} />;
}

export function Routes() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <CustomRoute exact path="/" component={Welcome} />
          <CustomRoute isPrivate path="/myplants" component={MyPlants} />
          <CustomRoute isPrivate path="/newplant" component={NewPlant} />
          <CustomRoute isPrivate path="/saveplant/:id" component={SavePlant} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}
