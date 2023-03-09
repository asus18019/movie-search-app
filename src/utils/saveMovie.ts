import { IMovie } from '@/redux/movie/types';

export const saveMovie = (imdbID: string, Title: string, Year: string, Poster: string, Type: string): string[] => {
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
	return savedMovies.map(movie => movie.imdbID);
};