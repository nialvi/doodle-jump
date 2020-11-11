// import { initGame, InitConfig } from './app';
import {
	reducer as gameReducer,
	actions as gameActions,
} from './app/@engine/game/entities';

import {
	reducer as sceneReducer,
	actions as sceneActions,
} from './app/mainScene/entities';
import { reducer as playerReducer } from './app/player/entities';

import { init as initStore } from './app/@engine/game/store';
import { initRender as initGameRender } from './app/@engine/game/usecases';
import { render as renderStartScene } from './app/startScene/view';
import { render as renderMainScene } from './app/mainScene/render';
import { Status } from 'app/@engine/scene/entities/interface';

document.addEventListener('DOMContentLoaded', () => {
	// const config: InitConfig = {
	// 	startPoint: 150,
	// 	screen: document.querySelector('.screen'),
	// 	buttonStart: document.querySelector('.start'),
	// 	doodler: document.createElement('div'),
	// };

	// initGame(config);

	initGameEngine();
});

function initGameEngine() {
	const store = initStore({
		reducer: { game: gameReducer, scene: sceneReducer, player: playerReducer },
		ignoredActions: [sceneActions.setObject.type],
	});

	let gameLoopId;

	const root = document.body;
	const startElement = document.getElementById('start');
	const endElement = document.getElementById('end');
	const scoreElement = document.getElementById('score');
	const logElement = document.getElementById('log');
	const playerElement = document.createElement('div');

	root.appendChild(playerElement);

	const gameRender = initGameRender({
		start: state => {
			renderStartScene(state, { player: playerElement });
		},
		inprogress: state => {
			renderMainScene(state, { score: scoreElement, player: playerElement });
		},
	});

	gameRender(store.getState());

	startElement.addEventListener('click', () => {
		store.dispatch(gameActions.setScene('inprogress'));

		store.dispatch(
			sceneActions.setMesh({
				width: window.outerWidth,
				height: window.outerHeight,
			})
		);

		gameLoopId = requestAnimationFrame(function render(t) {
			const { game } = store.getState();

			if (Math.round(t) % 4 === 0) {
				const newScore = game.score + 1;

				store.dispatch(gameActions.setScore(newScore));
			}

			const state = store.getState();

			gameRender(state);

			if (state.scene.status === Status.Inprogress) {
				requestAnimationFrame(render);
			}
		});
	});

	endElement.addEventListener('click', () => {
		store.dispatch(sceneActions.setStatus(Status.Pause));
		store.dispatch(gameActions.setScene('end'));

		cancelAnimationFrame(gameLoopId);
	});

	logElement.addEventListener('click', () => {
		console.log(store.getState());
	});
}
