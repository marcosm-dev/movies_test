import { 
	Card,
	CardHeader,
	CardActions,
	CardContent,
	CardMedia,
	Rating,
	Typography,
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
		popularity,
		original_language,
		genres
	} = movie;

	const popularityPercennt = popularity / 100;

	const STATES = {
		en: 'gb-eng',
		ja: 'jp'
	}

	const handleRating = e => {
		console.log(e)
	}

		return (
			<Card sx={{ background: '#f8f8f8' }}>
				<CardHeader
					sx={{ color: '#000', backgroundColor: 'primary' }}
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
				<Typography
					variant='div'
					style={{ display: 'flex' }}
				>
				<CardMedia
					component='img'
					height={300}
					sx={{ 
						maxWidth: '90%', 
						margin: 'auto', 
						borderRadius: 1, 
						paddingLeft: 2,
						left: 0
					}}
					image={`${VITE_API_IMG_URI}${poster_path}`}
					alt='Movie Card'
				/>
				<CardContent sx={{ overflow: 'hidden', display: 'inline-grid' }}>
					<Typography variant='body2' color='text.secondary' paddingX={6}>
						{ overview }
					</Typography>
					<Typography variant='body2' color='text.primary' marginLeft='auto'>
						<ul>
							{ genres.map(gen => (
									<li>{gen.name}</li>
							)) 
							}
						</ul>
					</Typography>
				</CardContent>
				</Typography>
				<Typography variant='div' fontSize={14} marginY={2} display='flex' marginLeft={2}>
					<img
						src={`https://countryflagsapi.com/png/${STATES[original_language] 
						? STATES[original_language]
						: original_language
					}`
				}
						className='flag-image'
						height={20}
						widh={30}
					/>
					<span>
						{ original_language.toUpperCase() }
					</span>
				</Typography>
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
					>
						{ vote_average } { `(${vote_count})` }
					</Typography>
					<Typography 
						variant='span' 
						color='secondary' 
						padding={1}
						borderRadius={50}
						fontSize={18} 
						marginLeft='auto'
					>
					Popularity: { popularityPercennt.toFixed(2)}%
				</Typography>
				</CardActions>
    </Card>
		)

}

export default MovieDetail;