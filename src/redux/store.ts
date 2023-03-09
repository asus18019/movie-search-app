import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import movieSlice from './movie/slice';
import pageSlice from './page/slice';

export const store = configureStore({
	reducer: {
		movieSlice,
		pageSlice
	}
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();