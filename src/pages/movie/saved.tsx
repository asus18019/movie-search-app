import { Box, Container, Grid, styled, Typography } from '@mui/material';
import Header from '@/components/Header';
import MovieCard from '@/components/MovieCard';
import { IMovie } from '@/redux/movie/types';
import { FC, useCallback, useEffect } from 'react';
import { useAppDispatch } from '@/redux/store';
import { selectSavedMovies, setSavedMovies, setSearchValue } from '@/redux/savedMovies/slice';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import debounce from 'lodash.debounce';

const PlainText = styled(Typography)({
	fontFamily: 'Merriweather'
});

const Saved: FC = () => {
	const dispatch = useAppDispatch();
	const { movies, searchValue } = useSelector(selectSavedMovies);
	const savedMovies = movies;

	useEffect(() => {
		const savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
		if(searchValue === '') {
			dispatch(setSavedMovies(savedMovies));
		} else {
			dispatch(setSavedMovies(savedMovies.filter(movie => movie.Title.toLowerCase().includes(searchValue.toLowerCase()))));
		}
	}, []);

	const onChangeSearchValue = (value: string) => {
		dispatch(setSearchValue(value));
		handleFilterMovies(value);
	};

	const handleFilterMovies = useCallback(
		debounce(async (value: string) => {
			const savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
			if(value === '') {
				dispatch(setSavedMovies(savedMovies));
				return;
			}
			dispatch(setSavedMovies(savedMovies.filter(movie => movie.Title.toLowerCase().includes(value.toLowerCase()))));
		}, 500),
		[]
	);

	const handleClearSearch = () => {
		const savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
		dispatch(setSavedMovies(savedMovies));
		dispatch(setSearchValue(''));
	};

	return (
		<>
			<Head>
				<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400&display=swap"
				      rel="stylesheet"/>
			</Head>
			<Container maxWidth="lg">
				<Box sx={ { my: 4 } }>
					<Header
						handleClearSearch={ handleClearSearch }
						onChangeSearchValue={ onChangeSearchValue }
						searchValue={ searchValue }
						headerTitle={ 'Saved movies' }
					/>
					<Box>
						{
							savedMovies.length ? (
								<>
									<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' }, mb: { xs: 3, lg: 5 } } }>
										Movies found: { savedMovies.length }
									</PlainText>
									<Grid container spacing={ { xs: 3, lg: 6 } }>
										{
											savedMovies.map((movie: IMovie) => {
												return (
													<Grid key={ movie.imdbID } item xs={ 12 } sm={ 6 } md={ 4 }>
														<MovieCard
															imdbID={ movie.imdbID }
															Poster={ movie.Poster }
															Title={ movie.Title }
															Year={ movie.Year }
															Type={ movie.Type }
															isShowDeleteBtn={ true }
														/>
													</Grid>
												);
											})
										}
									</Grid>
								</>
							) : (
								<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' }, mb: { xs: 3, lg: 5 } } }>
									There are no saved movies. Try to save any...
								</PlainText>
							)
						}
					</Box>
				</Box>
			</Container>
		</>
	);
};

export default Saved;