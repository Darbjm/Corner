import React from 'react';
import { BrowserRouter, Route, Switch,  } from 'react-router-dom'
import Login from './login';
import Swipe from './swipe';
import * as Style from './styles';
import Home from './home';

function App() {
  return (
    <BrowserRouter>
    <>
      <Switch>
        <Style.Section>
            <Route exact path='/' component={Home} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/swipe' component={Swipe} />
        </Style.Section>
      </Switch>
    </>
    </BrowserRouter>
  );
}

export default App;
