import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { initialStateType, ISearchResponse, Status } from '@/redux/movie/types';

const initialState: initialStateType = {
	status: Status.NONE,
	movies: [],
	error: '',
	totalResults: 0,
	searchValue: ''
}

interface IFetchMoviesThunkProps {
	searchValue: string,
	page: number
}

export const fetchMovies = createAsyncThunk<ISearchResponse, IFetchMoviesThunkProps>(
	'movies/fetchMovies',
	async ({ searchValue, page }) => {
		const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
		const response = await fetch(`${ process.env.NEXT_PUBLIC_BASE_URL }/?apikey=${ API_KEY }&s=${ searchValue }&page=${ page }`);
		return await response.json();
	}
);

export const selectSearchValue = (state: RootState) => state.movieSlice.searchValue;
export const selectMovies = (state: RootState) => state.movieSlice;

const slice = createSlice({
	name: 'movies',
	initialState,
	reducers: {
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload
		},
		clearSearch: (state) => {
			state.status = Status.NONE;
			state.movies = [];
			state.searchValue = '';
			state.totalResults = 0;
		}
	},
	extraReducers(builder) {
		builder.addCase(fetchMovies.pending, (state) => {
			state.status = Status.LOADING;
			state.movies = [];
		});
		builder.addCase(fetchMovies.fulfilled, (state, action) => {
			const isResponse = action.payload.Response === "True";
			if(!isResponse) {
				state.status = Status.ERROR;
				state.movies = [];
				state.error = action.payload.Error || '';
				return;
			}
			state.status = Status.SUCCESS;
			state.movies = action.payload.Search || [];
			state.totalResults = Number(action.payload.totalResults);
		});
		builder.addCase(fetchMovies.rejected, (state, action) => {
			state.status = Status.ERROR;
			state.movies = [];
			// @ts-ignore
			state.error = action.payload.Error;
		})
	}
})

export const { setSearchValue, clearSearch } = slice.actions;

export default slice.reducer;