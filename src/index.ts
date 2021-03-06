// import { initGame, InitConfig } from './app';

import {
	reducer as gameReducer,
	actions as gameActions,
} from './game/@engine/entities';
import {
	reducer as sceneReducer,
	actions as sceneActions,
} from './game/@engine/scene/entities';
import { init as initStore } from './game/@engine/store';
import { Status } from 'game/@engine/scene/entities/interface';

import {
	reducer as playerReducer,
	actions as playerActions,
} from 'game/player/entities';
import { initControl as initPlayerControl } from 'game/player/control';
import {
	reducer as platformsReducer,
	actions as platformsActions,
} from 'game/platforms/entities';

import { jumpInMiddleScene } from 'game/startScene/useCases';
import { render as renderStartScene } from './game/startScene/view';
import { render as renderMainScene } from './game/mainScene/view';
import { render as renderEndScene } from './game/endScene/view';

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
		reducer: {
			game: gameReducer,
			scene: sceneReducer,
			player: playerReducer,
			platforms: platformsReducer,
		},
	});

	const root = document.body;
	const startElement = document.getElementById('start');
	const endElement = document.getElementById('end');
	const scoreElement = document.getElementById('score');
	const logElement = document.getElementById('log');
	const playerElement = document.createElement('div');
	const resultElement = document.createElement('div');

	document.addEventListener('keydown', initPlayerControl(store));
	document.addEventListener('keyup', () =>
		store.dispatch(playerActions.straightMove())
	);

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
				renderStartScene(state, { root, player: playerElement });
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
