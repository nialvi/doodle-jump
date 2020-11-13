import { IPlayer } from './interface';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: IPlayer = {
	id: 'player',
	x: 0,
	y: 0,
	width: 87,
	height: 85,
	direction: 'up',
	sprite: 'player',
	status: 'enable',
};

export const { reducer, actions } = createSlice({
	name: 'player',
	initialState,
	reducers: {
		jump: state => ({
			...state,
			direction: 'up',
		}),
		fall: state => ({
			...state,
			direction: 'down',
		}),
		move: (
			state,
			{ payload: { x, y } }: PayloadAction<{ x: number; y: number }>
		) => ({
			...state,
			x,
			y,
		}),
	},
});
