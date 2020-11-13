import { IPlayer } from '../entities/interface';

export function movePlayer(
	player: IPlayer,
	leftBoandory: number
): { x: number; y: number } {
	if (player.x >= leftBoandory - player.width) {
		return { x: player.x, y: player.y };
	}

	return { x: player.x + 5, y: player.y };
}
