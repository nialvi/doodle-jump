import { init } from 'game/@engine/control/keyboard';
import { goLeft } from './left';
import { goRight } from './right';

export const initControl = store =>
	init({
		left: goLeft(store),
		right: goRight(store),
	});
