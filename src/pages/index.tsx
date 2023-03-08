import Head from 'next/head';
import {
	Box,
	Container,
	Typography,
	InputBase,
	styled,
	Stack,
	Divider,
	Grid
} from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import MovieCard from '@/components/MovieCard';
import { useCallback, useState } from 'react';
import debounce from 'lodash.debounce';

interface IMovieFromSearch {
	Poster: string,
	Title: string,
	Type: string,
	Year: string,
	imdbID: string
}

interface ISearchResponse {
	Response: string,
	Search?: IMovieFromSearch[],
	totalResults?: string,
	Error?: string,
}

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

const API_KEY = '8f36a973';

const Home = () => {
	const [searchValue, setSearchValue] = useState<string>('');
	const [requestStatus, setRequestStatus] = useState<string>('none');
	const [movies, setMovies] = useState<IMovieFromSearch[]>([]);

	const onChangeSearchValue = (value: string) => {
		setSearchValue(value);
		fetchMovies(value);
	};

	const fetchMovies = useCallback(
		debounce(async (value: string) => {
			if(value === '') {
				handleClearSearch();
				return;
			}
			setRequestStatus('pending');
			const res = await fetch(`https://www.omdbapi.com/?apikey=${ API_KEY }&s=${ value }&page=1`);
			const data: ISearchResponse = await res.json();
			if(data.Response === 'True' && data.Search?.length) {
				setMovies(data.Search);
				setRequestStatus('success');
			} else if(data.Response === 'False' && data.Error) {
				setRequestStatus(data.Error);
				setMovies([]);
			}
		}, 500),
		[]
	);

	const handleClearSearch = () => {
		setMovies([]);
		setRequestStatus('none');
		setSearchValue('');
	}

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
							requestStatus === 'success' && movies.length ? (
								<Grid container spacing={ { xs: 3, lg: 6 } }>
									{
										movies?.map(movie => {
											return (
												<Grid key={ movie.imdbID } item xs={ 12 } sm={ 6 } md={ 4 }>
													<MovieCard imdbID={ movie.imdbID } Poster={ movie.Poster }
													           Title={ movie.Title } Year={ movie.Year }/>
												</Grid>
											);
										})
									}
								</Grid>
							) : requestStatus === 'pending' ? (
								<div>Loading</div>
							) : requestStatus === 'none' ? (
								<div>Start searching for a movie. Type the name in the field above...</div>
							) : (
								<div>An error happened: { requestStatus }</div>
							)
						}
					</Box>
				</Container>
			</main>
		</>
	);
};

export default Home;