import React from 'react';
import { BrowserRouter, Route, Switch,  } from 'react-router-dom'
import Login from './pages/login';
import Swipe from './pages/swipe';
import Home from './pages/home';
import Register from './pages/register'
import { Section } from './styles/Components.style';


function App() {
  return (
    <BrowserRouter>
    <>
      <Switch>
        <Section>
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/swipe' component={Swipe} />
            <Route path='/register' component={Register} />
        </Section>
      </Switch>
    </>
    </BrowserRouter>
  );
}

export default App;
