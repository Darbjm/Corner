import React, { useEffect } from 'react';
import { NavBar, NavLogo, NavLinks, NavEnd } from './Nav.style'
import Typography from '../typography';
import auth from '../../lib/auth'
import logo from '../../assets/Corner Logo.svg'

const Nav = () => {
  const [isAuth, setAuth] = React.useState(false);

  useEffect(() => {
    if (auth.isAuthenticated()) return setAuth(true)
  }, []);

  return (
      <NavBar>
        <NavLogo src={logo} />
        <NavEnd>
        <NavLinks>
        {isAuth ? <Typography variant='internalLink' to='/home' color='primary' handleClick={() => auth.logout()}>
            <Typography variant="h2" color='primary'>
                Logout
            </Typography>
          </Typography> : <Typography variant='internalLink' to='/login' color='primary'>
            <Typography variant="h2" color='primary'>
                Login
            </Typography>
          </Typography>}
          <Typography variant='internalLink' to='/map' color='primary'>
              <Typography variant="h2" color='primary'>
                  Map
              </Typography>
          </Typography>
          <Typography variant='internalLink' to='/profile' color='primary'>
              <Typography variant="h2" color='primary'>
                  Profile
              </Typography>
          </Typography>
          <Typography variant='internalLink' to='/swipe' color='primary'>
              <Typography variant="h2" color='primary'>
                  Swipe
              </Typography>
          </Typography>
          <Typography variant='internalLink' to='/home' color='primary'>
          <Typography variant="h2" color='primary'>
              Home
          </Typography>
        </Typography>
        </NavLinks>
        </NavEnd>
      </NavBar>
  );
}

export default Nav