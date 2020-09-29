import React from 'react';
import Login from './login';
import Swipe from './swipe';
import * as Style from './styles';
import {Provider} from 'react-redux';
import Home from './home';
import {store} from './redux/store';

function App() {
  return (
    <Style.Section>
      <Provider store={store}>
        {/* <Login /> */}
        <Home />
        {/* <Swipe /> */}
      </Provider>
    </Style.Section>
  );
}

export default App;
