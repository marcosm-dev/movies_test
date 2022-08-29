import { useMemo, useState, createContext } from 'react';
import { mergeMap, map, startWith, catchError, of, timer } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { $ } from 'react-rxjs-elements';

const MoviesContext = createContext()
import { Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import useMovies from '../hooks/useMovies';

const MoviesPage = () => {
	const { page, setPage, handlePage } = useMovies();	
	const { movies, movies$ } = useMovies();

	return (
		<>
			<Grid 
				container
				minHeight={'100vh'}
				spacing={3}
				marginY={2}
				paddingX={{ xs: 1, sm: 2, md: 4, lg: 4 }}
			>
				<$>{ movies$ }</$>
			</Grid>
			<Stack 
				sx={{ paddingY: 5 }}
				spacing={2}
				direction='row' 
				justifyContent='center'
				alignItems='center'
			>
				<Pagination 
					count={movies.total_pages} 
					page={page} 
					color='primary' 
					onChange={handlePage} 
				/>
			</Stack>
		</>
	)
}
export default MoviesPage;