import { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import AppLayout from './AppLayout';
import Spinner from './Spinner';
import useMovies from '../hooks/useMovies';

const LoginPage = () => {
	const navigate = useNavigate();
	const { sessionHandle, userToken } = useMovies();
	const { VITE_API_KEY, VITE_API_URI } = import.meta.env;
	
	const createSessionToken = async () => {
		let data = null;
		await axios.get(`${VITE_API_URI}/authentication/token/new?api_key=${VITE_API_KEY}`)
		.then(({ data }) => {
			const { request_token } = data;
			window.open(`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.href}`, '_blank');
			localStorage.setItem('token', request_token);
		})	
		return data;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (userToken) {
			const body = { request_token: localStorage.getItem('token') };
			await axios.post(`${VITE_API_URI}/authentication/session/new?api_key=${VITE_API_KEY}`, body)
				.then(({ data }) => {
					if (data.success) {
						console.log('Login success ..');
						localStorage.setItem('SessionHandle', data.session_id);
						navigate('/');
					} else {
						console.log('Login Fail');
					}
				})
		} else {
			 await createSessionToken();
		}
	}

	return (
			<form onSubmit={ handleSubmit }>
					<FormControl sx={{ textAlign: 'center', margin: 'auto' }} fullWidth>
					<Button 
						variant='contained' 
						type='submit' 
						sx={{ textTransform: 'none', background: '#fafafa', marginTop: 2, color: '#002884' }}
						color='inherit'
					>
						{!!userToken ? 'Continuar' : 'Login'}
					</Button>
					</FormControl>
			</form>
	)
} 

export default LoginPage;