import Nav from './Nav';
import React from 'react';
import { BrowserRouter } from 'react-router-dom'

export default {
  title: 'Nav',
  component: Nav,
};

export const NavS = () => {
  return (
    <BrowserRouter>
      <Nav/>
    </BrowserRouter>
  );
};

NavS.story = {
  name: 'nav',
};