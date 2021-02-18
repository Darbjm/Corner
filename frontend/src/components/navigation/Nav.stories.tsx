import Nav from './Nav';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import { store } from '../../redux/store';

export default {
  title: 'Nav',
  component: Nav,
};

export const NavS = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Nav/>
      </Provider>
    </BrowserRouter>
  );
};

NavS.story = {
  name: 'nav',
};