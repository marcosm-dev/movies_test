import { useNavigate } from 'react-router-dom';
import { 
	CardActions,
	Grid, CardMedia, 
	Typography, Card, 
	Box, 
	Rating, 
	CardContent, 
	CardHeader
} from '@mui/material';
import moment from 'moment';

const MovieCard = ({ movie, setMovie }) => {
	const navigate = useNavigate();
	const { VITE_API_IMG_URI } = import.meta.env;

	const { 
		id,
		release_date,
		title,
		overview,
		poster_path,
		vote_average
	} = movie;

	const handleClick = () => {
		setMovie(movie);
		navigate(`/movie/${id}`);
	}

	const handleRating = (val) => {
		console.log(val * 2)
	}

  return (
		<Grid item lg={4} md={5} sm={8} xs={16}>
		<Card onClick={handleClick} sx={{ maxHeight: 300, cursor: 'pointer' }}>
      <CardHeader
				sx={{ color: '#002884' }}
        title={title}
        subheader={moment(release_date).format('LL')}
      />
      <CardMedia
        component='img'
        height={100}
				sx={{ maxHeight: 80 }}
        image={`${VITE_API_IMG_URI}${poster_path}`}
        alt='Movie Card'
      />
      <CardContent sx={{ height: '60px', overflow: 'hidden' }}>
        <Typography variant='body2' color='text.secondary'>
          { overview }
        </Typography>
      </CardContent>
			<CardActions disableSpacing>
			<Rating
				name='text-feedback'
				max={5}
				onChange={(event, newValue) => {
					handleRating(newValue);
				}}
				value={vote_average / 2}
				precision={0.5}
			/>
			<Typography 
				variant='span' 
				color='primary' 
				padding={1}
				borderRadius={50}
				fontSize={18} 
				marginLeft='auto'
			>
				{ vote_average }
			</Typography>
      </CardActions>
    </Card>
		</Grid>
  );
}

export default MovieCard;
