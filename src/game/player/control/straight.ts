import { Store } from '@reduxjs/toolkit';
import { actions } from '../entities';

export const goStraight = (store: Store) => (): void => {
	store.dispatch(actions.straightMove());
};
