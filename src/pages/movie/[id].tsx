import { Box, Button, CardMedia, Container, Grid, Stack, styled, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { FC } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { IMAGE_PLACEHOLDER_URL } from '@/constants';
import { IMovieProps } from '@/pages/movie/types';

export const getServerSideProps = async (context: { params: { id: any; }; }) => {
	const id = context.params.id;
	const res = await fetch(`https://www.omdbapi.com/?apikey=${ API_KEY }&i=${ id }&plot=full`);
	const data: IMovieProps = await res.json();

	if(data.Error) {
		return {
			redirect: {
				destination: '/404',
				permanent: false
			}
		};
	}

	return {
		props: {
			movie: data
		}
	};
};

const API_KEY = '8f36a973';

const MoviePropertyText = styled(Typography)({
	fontFamily: 'Merriweather',
	fontWeight: 900,
	fontSize: '17px',
	margin: '4px'
});

const MoviePropertyValueText = styled(Typography)({
	fontFamily: 'Merriweather',
	fontWeight: 300,
	fontSize: '17px',
	margin: '4px'
});

const Movie: FC<IMovieProps> = ({ movie }) => {
	const router = useRouter();
	return (
		<>
			<Head>
				<title>{ movie.Title }</title>
				<meta name="viewport" content="width=device-width, initial-scale=1"/>
				<link rel="icon" href="/favicon.ico"/>
				<link rel="preconnect" href="https://fonts.googleapis.com"/>
				<link rel="preconnect" href="https://fonts.gstatic.com"/>
				<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400;700;900&display=swap"
				      rel="stylesheet"/>
			</Head>
			<Container maxWidth="md">
				<Box sx={ { my: 4 } }>
					<Typography
						variant="h4"
						fontFamily="Merriweather"
						sx={ {
							fontSize: { xs: '24px', lg: '32px' },
							my: { xs: 1, lg: 3 }
						} }
					>
						{ movie.Title }
					</Typography>
					<Stack direction={ { xs: 'column', sm: 'row' } }>
						<CardMedia
							sx={ {
								width: { xs: '100%', sm: '500px' },
								height: { xs: '500px', sm: '400px' },
								borderRadius: 2,
								mr: { xs: 0, sm: '40px' }
							} }
							image={ movie.Poster === 'N/A' ? IMAGE_PLACEHOLDER_URL : movie.Poster }
							title={ movie.Title }
						/>
						<Box mt="10px" width="100%">
							<Grid container>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Rating:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.imdbRating } / 10</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Release date:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Released }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Genre:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Genre }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Director:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Director }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Language:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Language }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Country:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Country }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Runtime:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Runtime }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Writer:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Writer }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Awards:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Awards }</MoviePropertyValueText>
								</Grid>
								<Grid item xs={ 4 } height="fit-content">
									<MoviePropertyText>Actors:</MoviePropertyText>
								</Grid>
								<Grid item xs={ 8 }>
									<MoviePropertyValueText>{ movie.Actors }</MoviePropertyValueText>
								</Grid>
							</Grid>
						</Box>
					</Stack>
					<Typography
						variant="h4"
						fontFamily="Merriweather"
						sx={ {
							fontSize: { xs: '20px', lg: '24px' },
							mt: { xs: 3, lg: 6 },
							mb: { xs: 3, lg: 5 }
						} }
					>
						What is "{ movie.Title }" about?
					</Typography>
					<MoviePropertyValueText>{ movie.Plot }</MoviePropertyValueText>
					<Button startIcon={ <ArrowBackIcon/> } onClick={ () => router.back() } variant="contained" size="large" sx={ { mt: '25px' } }>
						BACK
					</Button>
				</Box>
			</Container>
		</>
	);
};

export default Movie;