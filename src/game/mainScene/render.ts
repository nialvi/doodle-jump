import { render as renderScore } from '../@engine/view/score';
// import { render as renderPlayer } from '../player/view/';

interface IElements {
	score: HTMLElement;
	player: HTMLElement;
}

export const render = (state: any, elements: IElements): void => {
	renderScore(elements.score, state.game.score);
	// renderPlayer(elements.player, state.player);
};
