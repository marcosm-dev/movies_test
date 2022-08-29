import { useMemo, createContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
	const params = useParams();
	const token = localStorage.getItem('token');
	const session = localStorage.getItem('SessionHandle');
	const [ movie, setMovie ] = useState({});

	const userToken = useMemo(() => !!token, [token])
	const sessionHandle = useMemo(() => !!session);
	
  /* Consultar API "Movies" y alamacenar en el state */
	function customFetch(URL) {
		// wait for both fetch and a 500ms timer to finish
		return zip(
			ajax.getJSON(URL).pipe( map(r => r) ),
			timer(500) // set a timer for 500ms
		).pipe(
			// then take only the first value (fetch result)
			map(([data]) => data)
		)
	};

  const movies$ = useMemo(
    () => customFetch(`${VITE_API_URI}/movie/popular?api_key=${VITE_API_KEY}`)
        .pipe(
          map(data => (
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
          )),
          catchError(() => of(<div>ERROR</div>)),
          startWith(<Spinner />)
        ),
	[]);


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
				movies$, 
				movie$,
				userToken,
				sessionHandle
			}}>
      	{children}
    </MoviesContext.Provider>
  );
};

export { MoviesProvider };

export default MoviesContext;
