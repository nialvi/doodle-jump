import { Store } from '@reduxjs/toolkit';
import { actions } from '../entities';

export const goLeft = (store: Store) => (): void => {
	store.dispatch(actions.leftMove());
};
