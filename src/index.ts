import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import { initGame, InitConfig } from './app';
import {
	reducer as gameReducer,
	actions as gameActions,
} from './app/game/entities';
import { render as renderScore } from './app/game/view/score';
import {
	reducer as sceneReducer,
	actions as sceneActions,
} from './app/scene/entities';
import { player } from './app/object/entities/player/entities';
import { render as renderPlayer } from './app/object/entities/player/view';

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
	const store = configureStore({
		reducer: { game: gameReducer, scene: sceneReducer },
		devTools: true,
		middleware: getDefaultMiddleware({
			serializableCheck: { ignoredActions: [sceneActions.setObject.type] },
		}),
	});

	let gameLoopId;

	const root = document.body;
	const startElement = document.getElementById('start');
	const endElement = document.getElementById('end');
	const scoreElement = document.getElementById('score');
	const logElement = document.getElementById('log');
	const playerElement = document.createElement('div');

	root.appendChild(playerElement);

	startElement.addEventListener('click', () => {
		// game.init();
		store.dispatch(gameActions.setScene('inprogress'));

		store.dispatch(
			sceneActions.setMesh({
				width: window.outerWidth,
				height: window.outerHeight,
			})
		);

		store.dispatch(sceneActions.setObject(player));
		renderPlayer(playerElement, player);

		// set platform
		store.dispatch(
			sceneActions.setObject({
				x: 10,
				y: 0,
				width: 33,
				height: 10,
			})
		);

		//game.run()

		gameLoopId = requestAnimationFrame(function render(t) {
			const { game } = store.getState();
			const newScore = game.score + 1;

			console.log('render');

			store.dispatch(gameActions.setScore(newScore));

			if (player.x < window.outerWidth) {
				player.x = player.x + 1;
				renderScore(scoreElement, newScore);
				store.dispatch(sceneActions.setObject(player));

				// store.dispatch(sceneActions.setObjects([player, platform1, platform2]));

				renderPlayer(playerElement, player);

				// initialScene.render();

				// initialScene.render();

				requestAnimationFrame(render);
			}
		});
	});

	endElement.addEventListener('click', () => {
		//game.end()
		store.dispatch(gameActions.setScene('end'));
		player.x = 0;
		store.dispatch(sceneActions.setObject(player));
		renderPlayer(playerElement, player);
		cancelAnimationFrame(gameLoopId);
	});

	logElement.addEventListener('click', () => {
		// game.log()
		console.log(store.getState());
	});
}
