import { initGame, InitConfig } from './app';

document.addEventListener('DOMContentLoaded', () => {
	const config: InitConfig = {
		startPoint: 150,
		screen: document.querySelector('.screen'),
		buttonStart: document.querySelector('.start'),
		doodler: document.createElement('div'),
	};

	initGame(config);
});
