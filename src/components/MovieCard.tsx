import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';

const MovieCard = () => {
	return (
		<Card variant="outlined" sx={ { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)' } }>
			<CardMedia
				sx={ { height: 200 } }
				image="https://m.media-amazon.com/images/M/MV5BOTFlOGE5OTYtYjhiZS00MWIwLTkyZTktYjUyODc2NjEzOWZiXkEyXkFqcGdeQXVyMzQwNDE2NDg@._V1_SX300.jpg"
				title="green iguana"
			/>
			<CardContent>
				<Stack sx={ { display: 'flex', flexDirection: 'row', my: '5px', alignItems: 'center' } }>
					<CalendarMonthRoundedIcon sx={ { height: '20px', color: 'grey' } }/>
					<Typography alignSelf='middle' variant="subtitle1" fontSize="14px" color="grey" component="p" fontFamily='Merriweather' fontWeight={300}>23 Nov
						2018</Typography>
				</Stack>
				<Typography gutterBottom variant="h5" component="div">
					Astral
				</Typography>
				<Typography variant="body2" color="text.secondary">
					A detached university student faces the consequences of astral projection when he uses it to
					reconnect with his dead mother.
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">View</Button>
				<Button size="small">Save</Button>
			</CardActions>
		</Card>
	);
};

export default MovieCard;