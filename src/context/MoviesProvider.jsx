import { useMemo, createContext, useEffect, useState } from 'react';
import { 
		mergeMap, 
		map, 
		startWith, 
		catchError, 
		of, 
		zip, 
		timer,
} from 'rxjs';

import { fromFetch } from 'rxjs/fetch';
import { ajax } from 'rxjs/ajax';
import { fromAjax } from 'rxjs/internal/ajax/ajax';
import { Grid } from '@mui/material';
import MovieCard from '../components/MovieCard';
import MovieDetail from '../components/MovieDetail';
import Spinner from '../components/Spinner';
const MoviesContext = createContext();

const { VITE_API_KEY, VITE_API_URI } = import.meta.env;

const MoviesProvider = ({ children }) => {
	const token = localStorage.getItem('token');
	const session = localStorage.getItem('SessionHandle');
	const [ movie, setMovie ] = useState({});
	const [ movies, setMovies ] = useState({});
	const [ page, setPage ] = useState(1);

	const handlePage = (e, val) => {
		setPage(val);
	}
	const userToken = useMemo(() => !!token, [token])
	const sessionHandle = useMemo(() => !!session, []);

	/* Establecer un temporizador para evitar el parpadeo y obtener los datos */
	function customFetch(URL) {
		return zip(
			ajax.getJSON(URL).pipe( map(r => r) ),
			timer(500) // set a timer for 500ms
		).pipe(
			map(([data]) => data)
			)
		};
		
	/* Consultar API "Movies" y alamacenar en el state */
  const movies$ = useMemo(
    () => customFetch(`${VITE_API_URI}/movie/popular?api_key=${VITE_API_KEY}&page=${page}`)
        .pipe(
          map(data => {
						setMovies(data);
						return (
							<>
								{ data.results.map(movie => (
											<MovieCard 
												key={movie.id}
												movie={movie}
												setMovie={setMovie}
											/>
									)) 
								}
							</>
						)
					}),
          catchError(() => of(<div>ERROR</div>)),
          startWith(<Spinner />)
        ),
	[page]);


	const movie$ = useMemo(
		() => ajax.getJSON(`${VITE_API_URI}/movie/${movie.id}?api_key=${VITE_API_KEY}`)
				.pipe(
					map(data => <>{<MovieDetail movie={data} />}</>),
					catchError(() => of(<div>ERROR</div>)),
          startWith(<Spinner />),
		), 
	[movie]);

  return (
    <MoviesContext.Provider 
			value={{ 
				movie,
				movies,
				movie$,
				movies$, 
				userToken,
				sessionHandle,
				handlePage,
				page,
				setPage
			}}>
      	{children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider };

export default MoviesContext;
