import { render as renderPlayer } from 'game/player/view';
import { render as renderPlatforms } from 'game/platforms/view';

interface IElements {
	player: HTMLElement;
	root: HTMLElement;
}

// TODO add types
export const render = (state: any, elements: IElements): void => {
	renderPlayer(elements, state.player);
	renderPlatforms(elements, state.platforms);
};
