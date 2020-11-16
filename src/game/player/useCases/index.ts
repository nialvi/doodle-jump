import { IPlayer } from '../entities/interface';

export interface ICoordinates {
	x: number;
	y: number;
}

const SPEED = 1;

export function moveUp(player: IPlayer): ICoordinates {
	return { x: player.x, y: player.y + SPEED };
}

export function moveDown(player: IPlayer): ICoordinates {
	return { x: player.x, y: player.y - SPEED };
}
