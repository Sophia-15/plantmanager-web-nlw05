import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { MyPlants } from './pages/MyPlants';
import { NewPlant } from './pages/NewPlant';
import { SavePlant } from './pages/SavePlant';

import { Welcome } from './pages/Welcome';
import './styles/global.scss';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Welcome} />
        <Route path="/myplants" component={MyPlants} />
        <Route path="/newplant" component={NewPlant} />
        <Route path="/saveplant/:id" component={SavePlant} />
      </Switch>
    </Router>
  );
}

export default App;
