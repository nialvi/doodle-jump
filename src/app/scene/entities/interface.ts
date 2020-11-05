export enum Status {
	Inprogress = 'inprogress',
	Pause = 'pause',
	End = 'end',
}

export interface IObject {
	x: number;
	y: number;
	width: number;
	height: number;
}

export interface IScene {
	status: Status;
	mesh: number[][];
	objects?: IObject[];
}
