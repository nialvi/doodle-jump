import { configureStore } from '@reduxjs/toolkit';
import { initGame, InitConfig } from './app';
import {
	reducer as gameReducer,
	actions as gameActions,
} from './app/game/entities';

import { render as renderScore } from './app/game/view/score';

document.addEventListener('DOMContentLoaded', () => {
	const config: InitConfig = {
		startPoint: 150,
		screen: document.querySelector('.screen'),
		buttonStart: document.querySelector('.start'),
		doodler: document.createElement('div'),
	};

	initGame(config);

	initGameEngine();
});

function initGameEngine() {
	const store = configureStore({ reducer: gameReducer, devTools: true });

	let gameLoopId;

	const startElement = document.getElementById('start');
	const endElement = document.getElementById('end');
	const scoreElement = document.getElementById('score');
	const logElement = document.getElementById('log');

	startElement.addEventListener('click', () => {
		store.dispatch(gameActions.setScene('inprogress'));

		gameLoopId = setInterval(() => {
			const { score } = store.getState();
			const newScore = score + 1;

			store.dispatch(gameActions.setScore(newScore));

			renderScore(scoreElement, newScore);
		}, 150);
	});

	endElement.addEventListener('click', () => {
		store.dispatch(gameActions.setScene('end'));
		clearInterval(gameLoopId);
	});

	logElement.addEventListener('click', () => {
		console.log(store.getState());
	});
}
