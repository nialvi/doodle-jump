import { render as renderScore } from '../../@engine/view/score';

interface IElements {
	score: HTMLElement;
	player: HTMLElement;
}

// TODO add types
export const render = (state: any, elements: IElements): void => {
	renderScore(elements.score, state.game.score);
};
