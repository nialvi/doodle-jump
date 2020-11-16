import { IPlayer } from 'game/player/entities/interface';
import { moveUp, moveDown } from 'game/player/useCases';

export interface ICoordinates {
	x: number;
	y: number;
}

export function jumpInMiddleScene(player: IPlayer): ICoordinates {
	if (player.direction === 'up') {
		return moveUp(player);
	}

	return moveDown(player);
}
