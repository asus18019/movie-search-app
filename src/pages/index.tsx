import Head from 'next/head';
import { ChangeEvent, FC, useCallback, useEffect, useState } from 'react';
import {
	Box,
	Container,
	Typography,
	styled,
	Grid,
	CircularProgress,
	Pagination
} from '@mui/material';
import MovieCard from '@/components/MovieCard';
import debounce from 'lodash.debounce';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { clearSearch, fetchMovies, selectMovies, setSearchValue } from '@/redux/movie/slice';
import { IMovie, Status } from '@/redux/movie/types';
import { selectCurrentPage, setCurrentPage } from '@/redux/page/slice';
import Header from '@/components/Header';
import { getSavedMovieIDs } from '@/utils/getSavedMovieIDs';
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

interface IHomeProps {
	query: ParsedUrlQuery;
}

const Home: FC<IHomeProps> = ({ query }) => {
	const dispatch = useAppDispatch();
	const router = useRouter();
	const { movies, status, totalResults, error, searchValue } = useSelector(selectMovies);
	const currentPage = useSelector(selectCurrentPage);
	const [savedIDs, setSavedIDs] = useState<string[]>([]);

	useEffect(() => {
		const isMoviesFetched = Boolean(movies.length);

		if(!isMoviesFetched) {
			setSavedIDs(getSavedMovieIDs());
			const searchParam = query?.search?.toString().toLowerCase();
			const pageParam = query?.page?.toString().toLowerCase();

			if(searchParam && !pageParam) {
				dispatch(setSearchValue(searchParam));
				dispatch(fetchMovies({
					searchValue: searchParam
				}));
			} else if(pageParam) {
				dispatch(setSearchValue(searchParam ? searchParam : searchValue));
				dispatch(fetchMovies({
					searchValue: searchParam ? searchParam : searchValue,
					page: Number(pageParam)
				}));
				dispatch(setCurrentPage(Number(pageParam)));
			}
		}
	}, []);

	const onChangeSearchValue = (value: string) => {
		dispatch(setSearchValue(value));
		handleFetchMovies(value);
	};

	const handleFetchMovies = useCallback(
		debounce(async (value: string) => {
			if(value.trimEnd() === '') {
				await handleClearSearch();
				return;
			}

			dispatch(setCurrentPage(1));
			dispatch(fetchMovies({ searchValue: value.trimEnd(), page: currentPage }));

			router.query = {
				...router.query,
				search: value.trimEnd()
			};
			await router.push(router);
		}, 500),
		[]
	);

	const handleClearSearch = async () => {
		dispatch(clearSearch());
		dispatch(setCurrentPage(1));
		router.query = {  };
		await router.push(router);
	};

	const handleChangePage = async (event: ChangeEvent<unknown>, page: number) => {
		dispatch(fetchMovies({ searchValue, page }));
		dispatch(setCurrentPage(page));
		if(page === 1) {
			delete router.query.page
		} else {
			router.query = {
				...router.query,
				page: page.toString()
			};
		}
		await router.push(router);
	};

	const isLoading = Status.LOADING === status;
	const isSuccess = Status.SUCCESS === status;
	const isError = Status.ERROR === status;

	const renderMovies = (movies: IMovie[]) => {
		return movies.map(movie => {
			return (
				<Grid key={ movie.imdbID } item xs={ 12 } sm={ 6 } md={ 4 }>
					<MovieCard
						imdbID={ movie.imdbID }
						Poster={ movie.Poster }
						Title={ movie.Title }
						Year={ movie.Year }
						Type={ movie.Type }
						savedIDs={ savedIDs }
						setSavedIDs={ setSavedIDs }
					/>
				</Grid>
			);
		});
	};

	return (
		<>
			<Head>
				<title>Movie application</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
				      rel="stylesheet"/>
			</Head>
			<main>
				<Container maxWidth="lg">
					<Box sx={ { my: 4 } }>
						<Header
							handleClearSearch={ handleClearSearch }
							onChangeSearchValue={ onChangeSearchValue }
							searchValue={ searchValue }
							headerTitle={ 'Movie search application' }
						/>
						{
							isSuccess ? (
								<Box>
									<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' }, mb: { xs: 3, lg: 5 } } }>
										Movies found: { totalResults }
									</PlainText>
									<Grid container spacing={ { xs: 3, lg: 6 } }>
										{ renderMovies(movies) }
									</Grid>
									<Box display="flex" justifyContent="center">
										<Pagination
											count={ Math.ceil(totalResults / 10) }
											showFirstButton
											showLastButton
											size="large"
											shape="rounded"
											variant="outlined"
											defaultPage={ 1 }
											page={ currentPage }
											onChange={ (event, page) => handleChangePage(event, page) }
											sx={ { my: { xs: 4, lg: 6 } } }
										/>
									</Box>
								</Box>
							) : isLoading ? (
								<Box display="flex" justifyContent="center">
									<CircularProgress size={ 60 }/>
								</Box>
							) : isError ? (
								<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' } } }>
									Oops... An error happened: { error } <br/>
									Try to write another title
								</PlainText>
							) : (
								<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' } } }>
									Start searching for movies. Write the title in the field above...
								</PlainText>
							)
						}
					</Box>
				</Container>
			</main>
		</>
	);
};

export default Home;