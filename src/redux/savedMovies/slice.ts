import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IMovie } from '@/redux/movie/types';

interface initialStateType {
	movies: IMovie[];
	searchValue: string;
}

const initialState: initialStateType = {
	movies: [],
	searchValue: ''
};

export const selectSavedMovies = (state: RootState) => state.savedMovieSlice;

const slice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		setSavedMovies: (state, action: PayloadAction<IMovie[]>) => {
			state.movies = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		}
	}
});

export const { setSavedMovies, setSearchValue } = slice.actions;

export default slice.reducer;