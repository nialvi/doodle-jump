import { IPlayer } from '../entities/interface';

interface IElements {
	root: HTMLElement;
	player: HTMLElement;
}

export const render = (
	{ root, player: playerElement }: IElements,
	player: IPlayer
): void => {
	playerElement.style.width = `${player.width}px`;
	playerElement.style.height = `${player.height}px`;
	playerElement.style.left = `${player.x}px`;
	playerElement.style.bottom = `${player.y}px`;
	playerElement.style.position = 'absolute';
	playerElement.style.backgroundColor = 'red';

	root.appendChild(playerElement);
};
