import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import movieSlice from './movie/slice';
import pageSlice from './page/slice';
import savedMovieSlice from './savedMovies/slice';

export const store = configureStore({
	reducer: {
		movieSlice,
		pageSlice,
		savedMovieSlice
	}
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();