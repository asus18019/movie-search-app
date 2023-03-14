import { Button, Card, CardActions, CardContent, CardMedia, Stack, styled, Typography } from '@mui/material';
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
import { saveMovie } from '@/utils/saveMovie';

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

const CustomButton = styled(Button)({
	fontWeight: 700,
	fontSize: 14,
	size: 'medium'
});

const MovieCard: FC<IMovieCardProps> = ({ Title, Year, Poster, imdbID, Type, savedIDs = [], setSavedIDs, isShowDeleteBtn = false }) => {
	const dispatch = useAppDispatch();
	const { searchValue } = useSelector(selectSavedMovies);

	const handleSaveMovie = () => {
		const ids = saveMovie(imdbID, Title, Year, Poster, Type);
		setSavedIDs(ids);
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
				<Link prefetch={ true } href={ `/movie/${ imdbID }` } className={ styles.link }>
					<CustomButton>View</CustomButton>
				</Link>
				{
					savedIDs?.includes(imdbID) ? (
						<CustomButton disabled>Saved</CustomButton>
					) : isShowDeleteBtn ? (
						<CustomButton color='error' onClick={ handleDeleteMovie }>Delete</CustomButton>
					) : (
						<CustomButton onClick={ handleSaveMovie }>Save</CustomButton>
					)
				}
			</CardActions>
		</Card>
	);
};

export default MovieCard;