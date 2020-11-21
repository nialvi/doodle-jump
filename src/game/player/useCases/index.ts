import { IPlayer } from '../entities/interface';

export interface ICoordinates {
	x: number;
	y: number;
}

const SPEED = 3;

export function moveUp(player: IPlayer): ICoordinates {
	return { x: player.x, y: player.y + SPEED };
}

export function moveDown(player: IPlayer): ICoordinates {
	return { x: player.x, y: player.y - SPEED };
}

function getX(player: IPlayer): number {
	switch (player.move) {
		case 'left':
			return player.x - SPEED;

		case 'right':
			return player.x + SPEED;

		default:
			return player.x;
	}
}

export function move(player: IPlayer): ICoordinates {
	return {
		x: getX(player),
		y: player.direction === 'down' ? player.y - SPEED : player.y + SPEED,
	};
}
