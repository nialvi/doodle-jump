import { IObject } from '../../@engine/object/entities/interface';

export type Direction = 'up' | 'down';

export interface IPlayer extends IObject {
	id: 'player';
	sprite: 'player';
	direction: Direction;
}
