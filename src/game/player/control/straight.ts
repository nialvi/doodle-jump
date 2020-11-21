import { actions } from '../entities';

export const goStraight = store => (): void => {
	store.dispatch(actions.straightMove());
};
