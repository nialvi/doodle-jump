import { start, InitialState } from '.';

export function moveStraight(
	leftTimer: NodeJS.Timeout,
	rightTimer: NodeJS.Timeout
): void {
	clearInterval(leftTimer);
	clearInterval(rightTimer);
}

export function moveRight(state: InitialState): void {
	clearInterval(state.timers.right);
	clearInterval(state.timers.left);

	state.timers.right = setInterval(() => {
		if (state.doodler.leftSpace <= 340) {
			state.doodler.leftSpace += 3;
			state.doodler.element.style.left = `${state.doodler.leftSpace}px`;
		} else {
			clearInterval(state.timers.right);
		}
	}, state.frameMs);
}

export function moveLeft(state: InitialState): void {
	clearInterval(state.timers.left);
	clearInterval(state.timers.right);

	state.timers.left = setInterval(() => {
		if (state.doodler.leftSpace >= 0) {
			state.doodler.leftSpace -= 3;
			state.doodler.element.style.left = `${state.doodler.leftSpace}px`;
		} else {
			clearInterval(state.timers.left);
		}
	}, state.frameMs);
}

export function control(e: KeyboardEvent, state: InitialState): void {
	switch (e.key) {
		case 'ArrowLeft': {
			moveLeft(state);
			break;
		}

		case 'ArrowRight': {
			moveRight(state);
			break;
		}

		case 'ArrowUp': {
			moveStraight(state.timers.left, state.timers.right);
			break;
		}

		case ' ': {
			start(state);
			break;
		}

		default:
			break;
	}
}
