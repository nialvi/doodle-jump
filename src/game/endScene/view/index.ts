interface IElements {
	root: HTMLElement;
	result: HTMLElement;
}

export const render = (state: any, elements: IElements): void => {
	elements.result.innerHTML = `Gameover ${state.game.score}`;
	elements.root.appendChild(elements.result);
};
