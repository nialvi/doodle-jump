import {
	configureStore,
	getDefaultMiddleware,
	Reducer,
	ReducersMapObject,
	Store,
} from '@reduxjs/toolkit';

interface IinitParams {
	reducer: Reducer | ReducersMapObject;
	ignoredActions: string[];
}

export const init = ({ reducer, ignoredActions }: IinitParams): Store => {
	const store = configureStore({
		reducer,
		devTools: true,
		middleware: getDefaultMiddleware({
			serializableCheck: { ignoredActions },
		}),
	});

	return store;
};
