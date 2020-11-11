import { IPlayer } from '../entities/interface';

export const render = (playerElement: HTMLElement, player: IPlayer): void => {
	playerElement.style.width = `${player.width}px`;
	playerElement.style.height = `${player.height}px`;
	playerElement.style.left = `${player.x}px`;
	playerElement.style.position = 'absolute';
	playerElement.style.backgroundColor = 'red';
};
