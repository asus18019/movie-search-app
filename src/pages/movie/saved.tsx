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
import { useRouter } from 'next/router';
import { GetServerSidePropsContext } from 'next';
import { ParsedUrlQuery } from 'querystring';

const PlainText = styled(Typography)({
	fontFamily: 'Merriweather'
});

export async function getServerSideProps(context: GetServerSidePropsContext) {
	return {
		props: {
			query: context.query
		}
	};
}

interface ISavedProps {
	query: ParsedUrlQuery;
}

const Saved: FC<ISavedProps> = ({ query }) => {
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { movies, searchValue } = useSelector(selectSavedMovies);
	const savedMovies = movies;

	useEffect(() => {
		const savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
		const searchParam = query.search?.toString().toLowerCase();
		if(!searchParam) {
			dispatch(setSavedMovies(savedMovies));
		} else {
			dispatch(setSearchValue(searchParam));
			dispatch(setSavedMovies(savedMovies.filter(movie => movie.Title.toLowerCase().includes(searchParam))));
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
				router.query = {};
			} else {
				dispatch(setSavedMovies(savedMovies.filter(movie => movie.Title.toLowerCase().includes(value.toLowerCase()))));
				router.query = { search: value };
			}
			await router.push(router);
		}, 500),
		[]
	);

	const handleClearSearch = async () => {
		const savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
		dispatch(setSavedMovies(savedMovies));
		dispatch(setSearchValue(''));
		router.query = {};
		await router.push(router);
	};

	const renderMovies = (movies: IMovie[]) => {
		return movies.map((movie: IMovie) => {
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
		});
	};

	return (
		<>
			<Head>
				<title>Saved movies</title>
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
										{ renderMovies(savedMovies) }
									</Grid>
								</>
							) : (!savedMovies.length && searchValue.length) ? (
								<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' }, mb: { xs: 3, lg: 5 } } }>
									No movie was found by your request. Try to write another title
								</PlainText>
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