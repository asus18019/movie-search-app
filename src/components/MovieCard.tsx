import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { FC } from 'react';

interface IMovieCardProps {
	Poster: string,
	Title: string,
	Year: string,
	imdbID: string
}

const MovieCard: FC<IMovieCardProps> = ({ Title, Year, Poster, imdbID }) => {
	return (
		<Card variant="outlined" sx={ { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)' } }>
			<CardMedia
				sx={ { height: 200 } }
				image={ Poster }
				title="green iguana"
			/>
			<CardContent>
				<Stack sx={ { display: 'flex', flexDirection: 'row', my: '5px', alignItems: 'center' } }>
					<CalendarMonthRoundedIcon sx={ { height: '20px', color: 'grey' } }/>
					<Typography alignSelf='middle' variant="subtitle1" fontSize="14px" color="grey" component="p" fontFamily='Merriweather' fontWeight={ 300 }>
						Released: { Year }
					</Typography>
				</Stack>
				<Typography variant="h5" component="div">
					{ Title }
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