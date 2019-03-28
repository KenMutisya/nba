import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from './components/home';
import Roster from './components/roster';
import Player from './components/player';
import News from './components/news';
import RosterSmall from './components/roster_small';

import './App.css';

const App = () => (

  <BrowserRouter>
    <div>
      <Route exact path='/' component={Home} />
      <Route exact path='/team/:alias' component={Roster} />
      <Route exact path='/player/:id' component={Player} />
      <Route exact path='/test/news' component={News} />
      <Route exact path='/test/rostersmall/:alias' component={RosterSmall} />
    </div>

  </BrowserRouter>
);

export default App;
