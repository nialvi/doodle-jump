import { IPlayer } from './interface';

export const player: IPlayer = {
	id: 'player',
	x: 0,
	y: 0,
	width: 87,
	height: 85,
	jump: () => {
		console.log('jump');
	},
	fall: () => {
		console.log('fall');
	},
};
