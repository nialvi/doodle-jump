import { moveStraight, moveRight, moveLeft } from '../game/control';
import { InitialState } from '../game';

beforeEach(() => jest.useFakeTimers());

afterEach(() => jest.clearAllTimers());

const startPoint = 100;
const state: InitialState = {
	screen: {
		startPoint,
		element: document.createElement('div'),
	},
	doodler: {
		element: document.createElement('div'),
		leftSpace: startPoint,
		bottomSpace: startPoint,
		isJumping: true,
	},
	timers: {
		up: null,
		left: null,
		right: null,
		platforms: null,
		fallDown: null,
	},
	score: 0,
	platforms: [],
	frameMs: 16,
	platformCount: 5,
};

test('move straight should be called', () => {
	const timeout = setTimeout(x => x, 10);
	moveStraight(timeout, timeout);

	expect(clearInterval).toBeCalledTimes(2);
});

test('move right should be called', () => {
	moveRight(state);

	expect(clearInterval).toBeCalledTimes(2);
	expect(setInterval).toBeCalled();
});

test('move left should be called', () => {
	moveLeft(state);

	expect(clearInterval).toBeCalledTimes(2);
	expect(setInterval).toBeCalled();
});
