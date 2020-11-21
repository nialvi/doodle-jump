import { IPlayer } from 'game/player/entities/interface';
import { move } from 'game/player/useCases';

export interface ICoordinates {
	x: number;
	y: number;
}

export function jumpInMiddleScene(player: IPlayer): ICoordinates {
	return move(player);
}
