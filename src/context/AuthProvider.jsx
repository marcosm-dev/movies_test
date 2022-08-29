import { useMemo, createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const { VITE_API_KEY, VITE_API_URI } = import.meta.env;

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
	const [ open, setOpen ] = useState(false);
	const navigate = useNavigate();
	const session = localStorage.getItem('SessionHandle');
	const token = localStorage.getItem('token');
	const sessionHandle = useMemo(() => !!session, [session]);
	const userToken = useMemo(() => !!token, [token]);
	const { VITE_API_KEY, VITE_API_URI } = import.meta.env;

	async function logout () {
		const params = { session_id: session };
		const { data } = await axios.delete(`${VITE_API_URI}/authentication/session?api_key=${VITE_API_KEY}`, {
			params,
		});
		localStorage.clear();
		return data;
	}

	/* Crear token para inicio de sesión */
	const createSessionToken = async () => {
		await axios.get(`${VITE_API_URI}/authentication/token/new?api_key=${VITE_API_KEY}`)
		.then(({ data }) => {
			const { request_token } = data;
			window.open(`https://www.themoviedb.org/authenticate/${request_token}?redirect_to=${window.location.href}`, '_blank');
			localStorage.setItem('token', request_token);
		})	
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const request_token = localStorage.getItem('token');
		if (userToken) {
			/* Obtener una nueva sesión y guardar el sesion_id en storage */
			const params = {
				request_token
			}
			await axios.post(`${VITE_API_URI}/authentication/session/new?api_key=${VITE_API_KEY}`, params)
				.then(({ data }) => {
					if (data.success) {
						console.log('Login success ..');
						localStorage.setItem('SessionHandle', data.session_id);
						navigate('/');
					} else {
						/* Mostrar Error */
						console.log('Login Fail');
					}
				})
		} else {
			 await createSessionToken();
		}
	}

	const handleClick = async () => {
		console.log('ohla')
		if (sessionHandle) {
			const data = await logout()
			navigate('/');
			localStorage.clear();
		} else {
			navigate('/login');
		}
	};

	return (
		<AuthContext.Provider 
			value={{
				setOpen,
				handleClick,
				handleSubmit,
				sessionHandle,
				userToken
			}}>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthProvider };

export default AuthContext;
