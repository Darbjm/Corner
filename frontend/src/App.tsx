import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Login from './pages/login';
import Swipe from './pages/swipe';
import Home from './pages/home';
import Register from './pages/register'
import Profile from './pages/profile'
import Map from './pages/map'
import FailedPage from './pages/failed'
import SecureRoute from './lib/SecureRoute'
import Main from './components/mainPage'
import Typography from './components/typography'

const getWindowDimensions = () => {
  const { innerWidth: width } = window;
  return width
}

function App() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());


  
    useEffect(() => {
      function handleResize() {
        setWindowDimensions(getWindowDimensions());
      }
  
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, []);
  
  return windowDimensions > 999 ? (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route path='/login/' component={Login} />
        <Route path='/swipe/' component={Swipe} />
        <Route path='/register/' component={Register} />
        <Route path='/map' component={Map} />
        <SecureRoute path='/profile/:id/' component={Profile} />
        <Route path="/*" component={FailedPage} />
      </Switch>
    </BrowserRouter>
  ) : (
    <BrowserRouter>
      <Switch>
        <Main>
          <Typography variant='h1' color='primary'>Device width too small</Typography>
        </Main>
      </Switch>
    </BrowserRouter>
    );
}

export default App;
