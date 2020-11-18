import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Platforms } from './interface';

const initialState: Platforms = [
	{
		id: 'default-platform',
		x: 100,
		y: 0,
		width: 90,
		height: 10,
		type: 'default',
		sprite: 'default-platform',
		status: 'enable',
	},
];

export const { reducer, actions } = createSlice({
	name: 'platforms',
	initialState,
	reducers: {
		addPlatform: (state, { payload }: PayloadAction<Platforms>) => {
			return {
				...state,
				...payload,
			};
		},
	},
});
