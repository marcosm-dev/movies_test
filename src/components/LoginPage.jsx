import axios from 'axios'
import { Button, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material';
import AppLayout from './AppLayout';
import useAuth from '../hooks/useAuth';

const LoginPage = () => {
	const { userToken, handleSubmit } = useAuth();
	console.log(userToken)

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