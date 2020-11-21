import { IObject } from '../../@engine/object/entities/interface';

export type Direction = 'up' | 'down';
export type Move = 'straight' | 'left' | 'right';

export interface IPlayer extends IObject {
	id: 'player';
	sprite: 'player';
	direction: Direction;
	move: Move;
}
