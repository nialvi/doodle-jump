import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IScene, Status } from '../../@engine/scene/entities/interface';
import { IObject } from '../../@engine/object/entities/interface';

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
			const xCells = Math.round(width / MESH_STEP);
			const yCells = Math.round(height / MESH_STEP);

			return {
				...state,
				mesh: [...Array(xCells)].map(() => [...Array(yCells)].map(() => 0)),
			};
		},
		setObject: (
			state,
			{ payload: { x, y, width, height } }: PayloadAction<IObject>
		) => {
			const widthCells = Math.round((x + width) / MESH_STEP);
			const heightCells = Math.round((y + height) / MESH_STEP);

			Array.from(Array(widthCells).keys())
				.slice(x / MESH_STEP)
				.forEach(xIndex => {
					Array.from(Array(heightCells).keys())
						.slice(y / MESH_STEP)
						.forEach(yIndex => {
							if (
								xIndex < state.mesh.length &&
								yIndex < state.mesh[xIndex].length
							) {
								state.mesh[xIndex][yIndex] = 1;
							}
						});
				});
		},
		setStatus: (state, { payload }: PayloadAction<Status>) => ({
			...state,
			status: payload,
		}),
	},
});