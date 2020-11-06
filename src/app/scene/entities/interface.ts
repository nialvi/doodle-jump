import { IObject } from '../../object/entities/interface';

export enum Status {
	Inprogress = 'inprogress',
	Pause = 'pause',
	End = 'end',
}

export interface IScene {
	status: Status;
	mesh: number[][];
	objects?: IObject[];
}
