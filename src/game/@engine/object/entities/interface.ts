export interface IObject {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	status: 'enable' | 'disable';
	sprite: string;
}
