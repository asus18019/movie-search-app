import Head from 'next/head';
import { ChangeEvent, useCallback } from 'react';
import {
	Box,
	Container,
	Typography,
	InputBase,
	styled,
	Stack,
	Divider,
	Grid,
	CircularProgress,
	Pagination
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MovieCard from '@/components/MovieCard';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/redux/store';
import { clearSearch, fetchMovies, selectMovies, setSearchValue } from '@/redux/movie/slice';
import { Status } from '@/redux/movie/types';
import { selectCurrentPage, setCurrentPage } from '@/redux/page/slice';

const InputContainer = styled(Stack)({
	border: '1px solid #e0e0e0',
	padding: '6px 12px'
});

const SearchInput = styled(InputBase)({
	fontWeight: 400,
	width: '100%',
	fontFamily: 'Merriweather',
	color: 'black'
});

const PlainText = styled(Typography)({
	fontFamily: 'Merriweather'
});

const Home = () => {
	const dispatch = useAppDispatch();
	const { movies, status, totalResults, error, searchValue } = useSelector(selectMovies);
	const currentPage = useSelector(selectCurrentPage);

	const onChangeSearchValue = (value: string) => {
		dispatch(setSearchValue(value));
		handleFetchMovies(value);
	};

	const handleFetchMovies = useCallback(
		debounce(async (value: string) => {
			if(value === '') {
				handleClearSearch();
				return;
			}
			dispatch(setCurrentPage(1));
			dispatch(fetchMovies({ searchValue: value, page: currentPage }));
		}, 500),
		[]
	);

	const handleClearSearch = () => {
		dispatch(clearSearch());
		dispatch(setCurrentPage(1));
	}

	const handleChangePage = (event: ChangeEvent<unknown>, page: number) => {
		dispatch(fetchMovies({ searchValue, page }));
		dispatch(setCurrentPage(page));
	};

	const isLoading = Status.LOADING === status;
	const isSuccess = Status.SUCCESS === status;
	const isError = Status.ERROR === status;

	return (
		<>
			<Head>
				<title>Movie application</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400&display=swap"
				      rel="stylesheet"/>
			</Head>
			<main>
				<Container maxWidth="lg">
					<Box sx={ { my: 4 } }>
						<Typography
							variant="h4"
							fontFamily="Merriweather"
							sx={ {
								fontSize: { xs: '20px', lg: '28px' },
								my: { xs: 1, lg: 3 }
							} }
						>
							Movie search application
						</Typography>
						<InputContainer direction="row">
							<SearchRoundedIcon sx={ { alignSelf: 'center' } }/>
							<SearchInput
								placeholder="Search..."
								value={ searchValue }
								onChange={ e => onChangeSearchValue(e.target.value) }
								sx={ {
									mx: 1,
									fontSize: { xs: '14px', lg: '16px' },
									p: '2px'
								} }
							/>
							<ClearRoundedIcon
								sx={ { alignSelf: 'center', cursor: 'pointer' } }
								onClick={ () => handleClearSearch() }
							/>
						</InputContainer>
						<Divider sx={ { my: { xs: 3, lg: 5 } } }/>
						{
							isSuccess ? (
								<Box>
									<PlainText sx={ { fontSize: { xs: '16px', lg: '18px' }, mb: { xs: 3, lg: 5 } } }>
										Movies found: { totalResults }
									</PlainText>
									<Grid container spacing={ { xs: 3, lg: 6 } }>
										{
											movies.map(movie => {
												return (
													<Grid key={ movie.imdbID } item xs={ 12 } sm={ 6 } md={ 4 }>
														<MovieCard imdbID={ movie.imdbID } Poster={ movie.Poster }
														           Title={ movie.Title } Year={ movie.Year }/>
													</Grid>
												);
											})
										}
									</Grid>
									<Box display='flex' justifyContent='center'>
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
								<CircularProgress size={ 60 } sx={ { mx: '50%' } }/>
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