import { initGame } from './game';

type Config = {
	startPoint: number;
	screen: HTMLElement;
	buttonStart: HTMLElement;
	doodler: HTMLElement;
};

document.addEventListener('DOMContentLoaded', () => {
	const config: Config = {
		startPoint: 150,
		screen: document.querySelector('.screen'),
		buttonStart: document.querySelector('.start'),
		doodler: document.createElement('div'),
		kek: 0,
	};

	initGame(config);
});
