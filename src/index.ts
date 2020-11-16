// import { initGame, InitConfig } from './app';

import {
	reducer as gameReducer,
	actions as gameActions,
} from './game/@engine/entities';

import {
	reducer as sceneReducer,
	actions as sceneActions,
} from './game/@engine/scene/entities';
import {
	reducer as playerReducer,
	actions as playerActions,
} from './game/player/entities';

import { init as initStore } from './game/@engine/store';
import { jumpInMiddleScene } from 'game/startScene/useCases';
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

	const root = document.body;
	const startElement = document.getElementById('start');
	const endElement = document.getElementById('end');
	const scoreElement = document.getElementById('score');
	const logElement = document.getElementById('log');
	const playerElement = document.createElement('div');
	const resultElement = document.createElement('div');

	root.appendChild(playerElement);

	const state = store.getState();
	type Store = typeof store;

	const gameRender = (store: Store) => {
		const state = store.getState();

		switch (state.scene.current) {
			case 'start': {
				if (state.player.y >= state.player.height * 2) {
					store.dispatch(playerActions.fallDirection());
				}

				if (state.player.y <= 0) {
					store.dispatch(playerActions.jumpDirection());
				}

				const cord = jumpInMiddleScene(state.player);

				store.dispatch(playerActions.move(cord));
				renderStartScene(state, { player: playerElement });
				break;
			}

			case 'inprogress':
				store.dispatch(gameActions.setScore(state.game.score + 1));

				renderMainScene(state, { score: scoreElement, player: playerElement });
				break;

			case 'end':
				renderEndScene(state, { root, result: resultElement });
				break;

			default:
				console.error('unknown scene');
				break;
		}
	};

	const gameLoopId = requestAnimationFrame(function render(t) {
		gameRender(store);

		if (state.scene.status === Status.Inprogress) {
			requestAnimationFrame(render);
		}
	});

	startElement.addEventListener('click', () => {
		store.dispatch(sceneActions.setScene('inprogress'));

		// store.dispatch(
		// 	sceneActions.setMesh({
		// 		width: window.outerWidth,
		// 		height: window.outerHeight,
		// 	})
		// );
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
