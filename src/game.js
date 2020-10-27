import { clearScreen } from './screen';
import { renderDoodler, jump } from './doodler';
import { createPlatforms, movePlatforms } from './platforms';
import { control } from './control';

export function start(state) {
	Object.keys(state.timers).forEach(name => clearInterval(state.timers[name]));

	clearScreen(state.screen.element);

	state.platforms = createPlatforms({
		screen: state.screen.element,
		platformCount: state.platformCount,
		leftSpace: state.doodler.leftSpace,
	});

	renderDoodler({
		screen: state.screen.element,
		doodler: state.doodler.element,
		leftSpace: state.doodler.leftSpace,
		bottomSpace: state.doodler.bottomSpace,
	});

	movePlatforms(state.platforms, state.doodler.bottomSpace);

	jump(state);

	state.timers.platforms = setInterval(() => {
		movePlatforms(state.platforms, state.doodler.bottomSpace);
	}, state.frameMs);
}

export function initGame({
	startPoint,
	screen,
	buttonStart,
	doodler,
	isJumping = true,
	platformCount = 5,
	frameMs = 16,
	score = 0,
	platforms = [],
}) {
	const initialState = {
		screen: {
			startPoint,
			element: screen,
		},
		doodler: {
			element: doodler,
			leftSpace: startPoint,
			bottomSpace: startPoint,
			isJumping,
		},
		timers: {
			up: 0,
			left: 0,
			right: 0,
			platforms: 0,
			fallDown: 0,
		},
		score,
		platforms,
		frameMs,
		platformCount,
	};

	buttonStart.addEventListener('click', () => {
		start(initialState);
	});

	document.addEventListener('keyup', e => control(e, initialState));
}
