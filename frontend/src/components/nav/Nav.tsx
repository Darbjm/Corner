import React, { useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { PRIMARY } from '../../styles/Colors'
import logo from '../../assets/Corner Logo.svg'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '../typography';
import auth from '../../lib/auth'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  }),
);

const Nav = () => {
  const classes = useStyles();
  const [isAuth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (auth.isAuthenticated()) return setAuth(true)
  }, []);

  return (
    <div>
      <AppBar position="static" style={{backgroundColor: PRIMARY}}>
        <Toolbar>
            <img src={logo} />
            {/* <NavLinks> */}
                <Typography variant='internalLink' href='#' color='secondary'>
                    <Typography variant="h2" color='secondary'>
                        {isAuth ? 'Logout' : 'Login'}
                    </Typography>
                </Typography>
                <Typography variant='internalLink' href='#' color='secondary'>
                    <Typography variant="h2" color='secondary'>
                        Map
                    </Typography>
                </Typography>
                <Typography variant='internalLink' href='#' color='secondary'>
                    <Typography variant="h2" color='secondary'>
                        Profile
                    </Typography>
                </Typography>
                <Typography variant='internalLink' href='#' color='secondary'>
                    <Typography variant="h2" color='secondary'>
                        Swipe
                    </Typography>
                </Typography>
                <Typography variant='internalLink' href='#' color='secondary'>
                    <Typography variant="h2" color='secondary'>
                        Home
                    </Typography>
                </Typography>
            {/* </NavLinks> */}
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Nav