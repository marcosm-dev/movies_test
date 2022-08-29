import { useParams } from 'react-router-dom';
import useMovies from '../hooks/useMovies';
import { $ } from 'react-rxjs-elements';

const MoviePage = () => {
	const { movie$ } = useMovies();

	return (
		<$>{ movie$ }</$>
	)
}

export default MoviePage;