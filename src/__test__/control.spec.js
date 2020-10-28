import { moveStraight, moveRight, moveLeft } from '../control';

beforeEach(jest.useFakeTimers);

afterEach(jest.clearAllTimers);

test('move straight should be called', () => {
	moveStraight(1, 2);

	expect(clearInterval).toBeCalledTimes(2);
});

test('move right should be called', () => {
	const state = {
		timers: {
			right: 1,
			left: 2,
		},
		doodler: {
			leftSpace: 100,
			element: document.createElement('div'),
		},
		frameMs: 16,
	};
	moveRight(state);

	expect(clearInterval).toBeCalledTimes(2);
	expect(setInterval).toBeCalled();
});

test('move left should be called', () => {
	const state = {
		timers: {
			right: 1,
			left: 2,
		},
		doodler: {
			leftSpace: 100,
			element: document.createElement('div'),
		},
		frameMs: 16,
	};
	moveLeft(state);

	expect(clearInterval).toBeCalledTimes(2);
	expect(setInterval).toBeCalled();
});
