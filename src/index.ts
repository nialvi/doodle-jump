// import { initGame, InitConfig } from './app';

import {
	reducer as gameReducer,
	actions as gameActions,
} from './game/@engine/entities';

import {
	reducer as sceneReducer,
	actions as sceneActions,
} from './game/@engine/scene/entities';
import { reducer as playerReducer } from './game/player/entities';

import { init as initStore } from './game/@engine/store';
import { render as renderStartScene } from './game/startScene/view';
import { render as renderMainScene } from './game/mainScene/render';
import { render as renderEndScene } from './game/endScene/view';
import { Status } from 'game/@engine/scene/entities/interface';

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

	const state = store.getState();
	type State = typeof state;

	const gameRender = (state: State) => {
		switch (state.scene.current) {
			case 'start':
				renderStartScene(state, { player: playerElement });
				break;

			case 'inprogress':
				renderMainScene(state, { score: scoreElement, player: playerElement });
				break;

			case 'end':
				renderEndScene(state, { root });
				break;

			default:
				console.error('unknown scene');
				break;
		}
	};

	gameRender(state);

	startElement.addEventListener('click', () => {
		store.dispatch(sceneActions.setScene('inprogress'));

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
		store.dispatch(sceneActions.setScene('end'));

		cancelAnimationFrame(gameLoopId);
	});

	logElement.addEventListener('click', () => {
		console.log(store.getState());
	});
}
