import {
	configureStore,
	getDefaultMiddleware,
	Reducer,
	ReducersMapObject,
	EnhancedStore,
} from '@reduxjs/toolkit';

interface IinitParams<S> {
	reducer: Reducer<S> | ReducersMapObject<S>;
	ignoredActions: string[];
}

export const init = <S>({
	reducer,
	ignoredActions,
}: IinitParams<S>): EnhancedStore<S> => {
	const store = configureStore({
		reducer,
		devTools: true,
		middleware: getDefaultMiddleware({
			serializableCheck: { ignoredActions },
		}),
	});

	return store;
};
