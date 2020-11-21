import {
	configureStore,
	Reducer,
	ReducersMapObject,
	EnhancedStore,
} from '@reduxjs/toolkit';

interface IinitParams<S> {
	reducer: Reducer<S> | ReducersMapObject<S>;
}

export const init = <S>({ reducer }: IinitParams<S>): EnhancedStore<S> => {
	const store = configureStore({
		reducer,
		devTools: true,
	});

	return store;
};
