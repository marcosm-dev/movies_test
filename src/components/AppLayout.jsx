import { Container, Typography, Grid, Box } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { MoviesProvider } from '../context/MoviesProvider';
import AppBar from './AppBar';
import MoviesPage from './MoviesPage';

const AppLayout = ({ children }) => {
		return (
			<>
				<AppBar />
				<Outlet />
			</>
		)
}

export default AppLayout;