import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScene, Status, Scene } from './interface';
import { IObject } from '../../object/entities/interface';

const initialState: IScene = {
	current: 'start',
	status: Status.Inprogress,
};

export const { reducer, actions } = createSlice({
	name: 'scene',
	initialState,
	reducers: {
		setStatus: (state, { payload }: PayloadAction<Status>): IScene => ({
			...state,
			status: payload,
		}),
		setScene: (state, { payload }: PayloadAction<Scene>): IScene => ({
			...state,
			current: payload,
		}),
	},
});
