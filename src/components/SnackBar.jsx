import { Snackbar, Alert } from '@mui/material'


const SnackBar = ({}) => {
	const { open, setOpen } = useAuth();

	const handleClose = () => {
		setOpen(false);
	}
	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
				Logout Success !!
			</Alert>
		</Snackbar>
	)
}