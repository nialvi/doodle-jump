interface IElements {
	root: HTMLElement;
}

export const render = (state: any, elements: IElements): void => {
	elements.root.innerHTML = `Gameover ${state.game.score}`;
};
