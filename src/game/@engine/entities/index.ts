import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IGame } from './interface';

const initialState: IGame = {
	score: 0,
};

export const { reducer, actions } = createSlice({
	name: 'game',
	initialState,
	reducers: {
		setScore: (state, { payload }: PayloadAction<number>) => ({
			...state,
			score: payload,
		}),
	},
});
