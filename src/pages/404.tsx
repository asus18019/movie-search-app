import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import Link from 'next/link';

const notFound = () => {
	return (
		<>
			<Head>
				<title>Page not found</title>
				<link href="https://fonts.googleapis.com/css2?family=Merriweather:wght@300;400&display=swap"
				      rel="stylesheet"/>
			</Head>
			<Container maxWidth="lg">
				<Box sx={ { my: 4 } }>
					<Typography variant="h4" fontFamily="Merriweather">
						Whoops!
					</Typography>
					<Typography variant="subtitle1" fontFamily="Merriweather">
						We can't seem to find the page you are looking for.
					</Typography>
					<Typography gutterBottom variant="subtitle1" fontFamily="Merriweather">
						<Link href="/">Homepage</Link>
					</Typography>
				</Box>
			</Container>
		</>
	);
};

export default notFound;