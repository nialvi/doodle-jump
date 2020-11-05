import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScene, Status } from './interface';
import { IObject } from '../../object/entities/interface';

const initialState: IScene = {
	status: Status.Inprogress,
	mesh: [[0], [0]],
};

const MESH_STEP = 10;

export const { reducer, actions } = createSlice({
	name: 'scene',
	initialState,
	reducers: {
		setMesh: (
			state,
			{
				payload: { width, height },
			}: PayloadAction<{ width: number; height: number }>
		) => {
			const xCount = Math.round(width / MESH_STEP);
			const yCoutn = Math.round(height / MESH_STEP);

			return {
				...state,
				mesh: [...Array(xCount)].map(() => [...Array(yCoutn)].map(() => 0)),
			};
		},
		setObject: (
			state,
			{ payload: { x, y, width, height } }: PayloadAction<IObject>
		) => {
			const xCount = Math.round((x + width) / MESH_STEP);
			const yCount = Math.round((y + height) / MESH_STEP);

			Array.from(Array(xCount).keys())
				.slice(x / MESH_STEP)
				.forEach(xIndex => {
					Array.from(Array(yCount).keys())
						.slice(y / MESH_STEP)
						.forEach(yIndex => {
							state.mesh[xIndex][yIndex] = 1;
						});
				});
		},
		setStatus: (state, { payload }: PayloadAction<Status>) => ({
			...state,
			status: payload,
		}),
	},
});
