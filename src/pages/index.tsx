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

export default function Home() {
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
								sx={ {
									mx: 1,
									fontSize: { xs: '14px', lg: '16px' },
									p: '2px'
								} }
							/>
							<ClearRoundedIcon sx={ { alignSelf: 'center', cursor: 'pointer' } }/>
						</InputContainer>
						<Divider sx={ { my: { xs: 3, lg: 5 } } }/>
						<Grid container spacing={ { xs: 3, lg: 6 } }>
							<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
								<MovieCard/>
							</Grid>
							<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
								<MovieCard/>
							</Grid>
							<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
								<MovieCard/>
							</Grid>
							<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
								<MovieCard/>
							</Grid>
							<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
								<MovieCard/>
							</Grid>
							<Grid item xs={ 12 } sm={ 6 } md={ 4 }>
								<MovieCard/>
							</Grid>
						</Grid>
					</Box>
				</Container>
			</main>
		</>
	);
}
