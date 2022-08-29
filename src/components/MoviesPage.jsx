import { useMemo, useState, createContext } from 'react';
import { mergeMap, map, startWith, catchError, of, timer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { $ } from 'react-rxjs-elements';

const MoviesContext = createContext()
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import useMovies from '../hooks/useMovies';

const MoviesPage = () => {
	const { movies$ } = useMovies();
	return (
		<Grid sx={{marginY: 2}} container spacing={3} columns={'16'} margin='auto'>
			<$>{ movies$ }</$>
		</Grid>
	)
}
export default MoviesPage;