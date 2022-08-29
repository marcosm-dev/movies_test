import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import { Container, Typography, Grid, Box } from '@mui/material';
import { MoviesProvider } from './context/MoviesProvider';
import { AuthProvider } from './context/AuthProvider';
import AppLayout from './components/AppLayout';
import MoviesPage from './components/MoviesPage';
import MoviePage from './components/MoviePage';
import LoginPage from './components/LoginPage';

function App() {

  return (
		<Router>
		<Container>
			<Box>
			<AuthProvider>
				<MoviesProvider>
					<Routes>
						<Route path='/' element={<AppLayout />}>
								<Route index element={<MoviesPage />} />
								<Route path='/login' element={<LoginPage />} />
								<Route path='/movie/:id' element={<MoviePage />} />
						</Route>
					</Routes>
				</MoviesProvider>
			</AuthProvider>
			</Box>
		</Container>
		</Router>
	)
}

export default App;
