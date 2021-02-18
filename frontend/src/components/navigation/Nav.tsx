import React, { useEffect } from 'react';
import { Nav, NavLogo, NavLinks, NavEnd } from './Nav.style'
import Typography from '../typography';
import auth from '../../lib/auth'
import logo from '../../assets/Corner Logo.svg'
import { useDispatch } from 'react-redux';
import { removeUser } from '../../redux';

const NavBar = () => {
  const dispatch = useDispatch();
  const [isAuth, setAuth] = React.useState(false);
  

  useEffect(() => {
    if (auth.isAuthenticated()) return setAuth(true)
  }, []);

  const logout = () => {
    auth.logout()
    setAuth(false)
    dispatch(removeUser({}))
  }

  return (
      <Nav>
        <Typography style={{display: 'flex'}} size='large' variant='internalLink' to='/' color='primary'>
          <NavLogo src={logo} alt='Corner logo'/>
        </Typography>
        <NavEnd>
        <NavLinks>
          <Typography size='large' variant='internalLink' to='/' color='primary'>
            Home
          </Typography>
          <Typography size='large' variant='internalLink' to='/map' color='primary'>
            Map
          </Typography>
          <Typography size='large' variant='internalLink' to='/swipe' color='primary'>
            Swipe
          </Typography>
          <Typography size='large' variant='internalLink' to={`/profile/${auth.getUser()}`} color='primary'>
            Profile
          </Typography>
          {isAuth ? <Typography size='large' variant='internalLink' to='/' color='primary' onClick={() => logout()}>
            Logout
          </Typography> : 
          <Typography size='large' variant='internalLink' to='/login' color='primary'>
            Login
          </Typography>}
          {isAuth ? null : 
          <Typography size='large' variant='internalLink' to='/register' color='primary'>
            Register
          </Typography>}
        </NavLinks>
        </NavEnd>
      </Nav>
  );
}

export default NavBar