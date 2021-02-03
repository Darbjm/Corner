import React, { useEffect } from 'react';
import { Nav, NavLogo, NavLinks, NavEnd } from './Nav.style'
import Typography from '../typography';
import auth from '../../lib/auth'
import logo from '../../assets/Corner Logo.svg'

const NavBar = () => {
  const [isAuth, setAuth] = React.useState(false);

  useEffect(() => {
    if (auth.isAuthenticated()) return setAuth(true)
  }, []);

  return (
      <Nav>
        <NavLogo src={logo} />
        <NavEnd>
        <NavLinks>
        {isAuth ? <Typography size='large' variant='internalLink' to='/home' color='primary' handleClick={() => auth.logout()}>
            Logout
          </Typography> : 
          <Typography size='large' variant='internalLink' to='/login' color='primary'>
            Login
          </Typography>}
          <Typography size='large' variant='internalLink' to='/map' color='primary'>
            Map
          </Typography>
          <Typography size='large' variant='internalLink' to='/profile' color='primary'>
            Profile
          </Typography>
          <Typography size='large' variant='internalLink' to='/swipe' color='primary'>
            Swipe
          </Typography>
          <Typography size='large' variant='internalLink' to='/' color='primary'>
            Home
        </Typography>
        </NavLinks>
        </NavEnd>
      </Nav>
  );
}

export default NavBar