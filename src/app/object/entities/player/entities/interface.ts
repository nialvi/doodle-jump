import { IObject } from '../../interface';

export interface IPlayer extends IObject {
	id: string;
	jump(): void;
	fall(): void;
}
