import { IMovie } from '@/redux/movie/types';

export const getSavedMovieIDs = (): string[] => {
	const savedMovies: IMovie[] = JSON.parse(localStorage.getItem('savedMovies') || '[]');
	return savedMovies.map(elem => elem.imdbID);
}