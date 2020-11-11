// todo add types
export const initRender = (scenes: any) => state => {
	scenes[state.game.scene]?.(state);
};
