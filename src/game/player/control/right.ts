import { actions } from '../entities';

export const goRight = store => (): void => {
	store.dispatch(actions.rightMove());
};
