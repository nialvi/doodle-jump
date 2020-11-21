import { IObject } from '../../@engine/object/entities/interface';

export type Platforms = Array<
	IDefaultPlatform | IMovablePlatform | IFakePlatform
>;

export interface IDefaultPlatform extends IObject {
	id: 'default-platform';
	type: 'default';
	sprite: 'default-platform';
}

export interface IMovablePlatform extends IObject {
	id: 'movable-platform';
	type: 'movable';
	sprite: 'movable-platform';
}

export interface IFakePlatform extends IObject {
	id: 'fake-platform';
	type: 'fake';
	sprite: 'fake-platform';
}
