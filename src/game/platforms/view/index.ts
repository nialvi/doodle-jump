import { Platforms } from '../entities/interface';

interface IElements {
	root: HTMLElement;
}

export const render = ({ root }: IElements, platforms: Platforms): void => {
	// TODO fix render platform
	// const platformElement = document.createElement('div');
	// platforms.forEach(platform => {
	// 	platformElement.style.width = `${platform.width}px`;
	// 	platformElement.style.height = `${platform.height}px`;
	// 	platformElement.style.left = `${platform.x}px`;
	// 	platformElement.style.bottom = `${platform.y}px`;
	// 	platformElement.style.position = 'absolute';
	// 	platformElement.style.backgroundColor = 'green';
	// 	root.appendChild(platformElement);
	// });
};
