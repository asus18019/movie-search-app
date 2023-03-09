import { Button, Card, CardActions, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import CalendarMonthRoundedIcon from '@mui/icons-material/CalendarMonthRounded';
import { FC } from 'react';
import styles from '../styles/MovieCard.module.css'
import Link from 'next/link'
import { IMAGE_PLACEHOLDER_URL } from '@/constants';
import { IMovie } from '@/redux/movie/types';
import { useAppDispatch } from '@/redux/store';
import { setSavedMovies } from '@/redux/savedMovies/slice';
import { useSelector } from 'react-redux';
import { selectSavedMovies } from '@/redux/savedMovies/slice';

interface IMovieCardProps {
	Poster: string,
	Title: string,
	Year: string,
	imdbID: string,
	Type: string,
	savedIDs?: string[],
	setSavedIDs?: any,
	isShowDeleteBtn?: boolean
}

const MovieCard: FC<IMovieCardProps> = ({ Title, Year, Poster, imdbID, Type, savedIDs = [], setSavedIDs, isShowDeleteBtn = false }) => {
	const dispatch = useAppDispatch();
	const { searchValue } = useSelector(selectSavedMovies);

	const handleSaveMovie = () => {
		let savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
		savedMovies.push({
			imdbID,
			Title,
			Year,
			Poster,
			Type
		})
		const updatedSavedMovies = JSON.stringify(savedMovies)
		localStorage.setItem('savedMovies', updatedSavedMovies);
		setSavedIDs([...savedIDs, imdbID]);
	};

	const handleDeleteMovie = () => {
		let savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
		const filteredMovies = savedMovies.filter(movie => movie.imdbID !== imdbID);
		if(searchValue.trim() === '') {
			dispatch(setSavedMovies(filteredMovies));
		} else {
			const filteredMoviesByTitle = filteredMovies.filter(movie => movie.Title.toLowerCase().includes(searchValue.toLowerCase()));
			dispatch(setSavedMovies(filteredMoviesByTitle));
		}

		localStorage.setItem('savedMovies', JSON.stringify(filteredMovies));
	};

	return (
		<Card variant="outlined" sx={ { boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.05)' } }>
			<CardMedia
				sx={ { height: 200 } }
				image={ Poster === 'N/A' ? IMAGE_PLACEHOLDER_URL : Poster }
				title={ Title }
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
				<Link href={ `/movie/${ imdbID }` } className={ styles.link }>
					<Button size="small">View</Button>
				</Link>
				{
					savedIDs?.includes(imdbID) ? (
						<Button size="medium" disabled>Saved</Button>
					) : isShowDeleteBtn ? (
						<Button size="medium" color='error' onClick={ handleDeleteMovie }>Delete</Button>
					) : (
						<Button size="medium" onClick={ handleSaveMovie }>Save</Button>
					)
				}
			</CardActions>
		</Card>
	);
};

export default MovieCard;