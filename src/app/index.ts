import { clearScreen } from './screen';
import { renderDoodler, jump } from './doodler';
import { createPlatforms, movePlatforms, IPlatform } from './platforms';
import { control } from './control';

export function start(state: InitialState): void {
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

export type InitConfig = {
	startPoint: number;
	screen: HTMLElement;
	buttonStart: HTMLElement;
	doodler: HTMLElement;
	isJumping?: boolean;
	platformCount?: number;
	frameMs?: number;
	score?: number;
	platforms?: IPlatform[];
};

export type InitialState = {
	screen: {
		startPoint: number;
		element: HTMLElement;
	};
	doodler: {
		element: HTMLElement;
		leftSpace: number;
		bottomSpace: number;
		isJumping: boolean;
	};
	timers: {
		up: NodeJS.Timeout;
		left: NodeJS.Timeout;
		right: NodeJS.Timeout;
		platforms: NodeJS.Timeout;
		fallDown: NodeJS.Timeout;
	};
	score: number;
	platforms: IPlatform[];
	frameMs: number;
	platformCount: number;
};

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
}: InitConfig): void {
	const initialState: InitialState = {
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
			up: null,
			left: null,
			right: null,
			platforms: null,
			fallDown: null,
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
