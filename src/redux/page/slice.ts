import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

interface initialStateType {
	currentPage: number
}

const initialState: initialStateType = {
	currentPage: 1
}

export const selectCurrentPage = (state: RootState) => state.pageSlice.currentPage;

const slice = createSlice({
	name: 'pages',
	initialState,
	reducers: {
		setCurrentPage: (state, action: PayloadAction<number>) => {
			state.currentPage = action.payload
		}
	},
})

export const { setCurrentPage } = slice.actions;

export default slice.reducer;