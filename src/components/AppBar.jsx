import { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

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
} from '@mui/material';
import LoginPage from './LoginPage';

const AppBarPage = () => {
	const { VITE_API_URI, VITE_API_KEY } = import.meta.env;
	const session = localStorage.getItem('SessionHandle');
	const navigate = useNavigate();
  const [ anchorEl, setAnchorEl ] = useState(null);
  const [ mobileMoreAnchorEl, setMobileMoreAnchorEl ] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const sessionHandle = useMemo(() => !!session, [session])

	async function logout () {
		const { data } = await axios.delete(`${VITE_API_URI}/authentication/session?api_key=${VITE_API_KEY}`, { session_id: session })
		localStorage.clear();
		return data;
	}

	const handleTitleClick = () => {
		console.log('title')
	}

	const handleClick = async () => {
		if (sessionHandle) {
			const { data } = await logout()
			console.log(data);
			navigate('/');
			handleMenuClose();
		} else {
			navigate('/login');
			handleMenuClose();
		}
	};

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
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
      { sessionHandle && (
					<MenuItem onClick={ handleClick }>
						{ sessionHandle ? 'Logout' : 'Login' }
					</MenuItem>
				) 
			}
    </Menu>
  );
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='sticky' color='secondary'>
        <Toolbar>
          <Typography
						onClick={ handleTitleClick }
            variant='h6'
            noWrap
            component='div'
            sx={{ fontSize: { xs: 12, sm: 16 } }}
          >
            MOVIES TEST
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