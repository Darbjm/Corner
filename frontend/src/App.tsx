import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './pages/login';
import Swipe from './pages/swipe';
import Home from './pages/home';
import Register from './pages/register'
import Profile from './pages/profile'
import Map from './pages/map'
import SecureRoute from './lib/SecureRoute'

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login/' component={Login} />
        <Route path='/swipe/' component={Swipe} />
        <Route path='/register/' component={Register} />
        <Route path='/map' component={Map} />
        <SecureRoute path='/profile/:id/' component={Profile} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
