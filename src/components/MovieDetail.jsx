import { 
	Card,
	CardHeader,
	CardActions,
	CardContent,
	CardMedia,
	Rating,
	Typography
} from '@mui/material';
import moment from 'moment';

const MovieDetail = ({ movie }) => {
	const { VITE_API_IMG_URI } = import.meta.env;
	const { 
		id,
		release_date,
		title,
		overview,
		poster_path,
		vote_average,
		vote_count,
		tagline,
		popularity
	} = movie;

	const handleRating = e => {
		console.log(e)
	}

		return (
			<Card sx={{ background: '#f6f5f5' }}>
				<CardHeader
					sx={{ color: '#000' }}
					subheader={moment(release_date).format('LL')}
					title={
						<Typography variant='span' display='flex'>
						{ title }
							<Typography variant='subtitle2' marginLeft='auto' color={'#002884'}>
								{ tagline }
							</Typography>
						</Typography>
					}
				/>
					
				<CardMedia
					component='img'
					height={300}
					sx={{ maxWidth: '90%', margin: 'auto', borderRadius: 2 }}
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
						{ vote_average } { `(${vote_count})` }
				</Typography>
				</CardActions>
    </Card>
		)

}

export default MovieDetail;