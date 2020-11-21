import { Store } from '@reduxjs/toolkit';
import { actions } from '../entities';

export const goRight = (store: Store) => (): void => {
	store.dispatch(actions.rightMove());
};
