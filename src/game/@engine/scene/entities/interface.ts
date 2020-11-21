import { IObject } from '../../object/entities/interface';

export enum Status {
	Inprogress = 'inprogress',
	Pause = 'pause',
	End = 'end',
}

export type Scene = 'start' | 'inprogress' | 'end';

export interface IScene {
	current: Scene;
	status: Status;
	objects?: IObject[];
}
