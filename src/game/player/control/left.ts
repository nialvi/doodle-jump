import { actions } from '../entities';

export const goLeft = store => (): void => {
	store.dispatch(actions.leftMove());
};
