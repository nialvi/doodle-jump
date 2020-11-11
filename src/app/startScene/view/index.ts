import { render as renderPlayer } from '../../player/view';

interface IElements {
	player: HTMLElement;
}

export const render = (state: any, elements: IElements): void => {
	renderPlayer(elements.player, state.player);
};
