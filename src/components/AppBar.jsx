import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import useAuth from '../hooks/useAuth'

import MenuIcon from '@mui/icons-material/Menu';
import MoreIcon from '@mui/icons-material/MoreVert';
import AccountCircle from '@mui/icons-material/AccountCircle';
import {
	AppBar, 
	Badge,
	Box, 
	Toolbar, 
	IconButton,
	Typography,
	Menu,
	MenuItem,
	Snackbar,
} from '@mui/material';
import LoginPage from './LoginPage';

const AppBarPage = () => {
	const { open, setOpen, handleClick } = useAuth();
	const { VITE_API_URI, VITE_API_KEY } = import.meta.env;
	const session = localStorage.getItem('SessionHandle');
	const token = localStorage.getItem('token');
	const navigate = useNavigate();
  const [ anchorEl, setAnchorEl ] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
	const sessionHandle = useMemo(() => !!session, [session])
	const userToken = useMemo(() => !!token, [token])

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

	const login = () => {
		handleClick();
		handleMenuClose();
	}

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={ handleMenuClose } disabled>
				Profile
			</MenuItem>
      { (sessionHandle || !userToken) && (
					<MenuItem onClick={ login }>
						{ sessionHandle ? 'Logout' : 'Login' }
					</MenuItem>
				) 
			}
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' color='primary'>
        <Toolbar>
          <Typography
            variant='h6'
            noWrap
            component='div'
						fontFamily='tahoma'
            sx={{ fontSize: { xs: 12, sm: 16 } }}
          >
            <Link to='/' className='link-header'>
							MOVIES TEST
						</Link>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box>
            <IconButton
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </Box>
  );
}

export default AppBarPage;