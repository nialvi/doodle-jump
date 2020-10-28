export interface IPlatform {
	bottom: number;
	left: number;
	element: HTMLElement;
}

export function createPlatform(
	screen: HTMLElement,
	bottomPosition: number,
	leftPosition = Math.random() * 315
): IPlatform {
	const bottom = bottomPosition;
	const left = leftPosition;
	const element = document.createElement('div');

	element.classList.add('platform');
	element.style.bottom = `${bottom}px`;
	element.style.left = `${left}px`;

	screen.appendChild(element);

	return {
		bottom,
		left,
		element,
	};
}

type ConfigCreatePlatforms = {
	screen: HTMLElement;
	platformCount: number;
	leftSpace: number;
};

export function createPlatforms({
	screen,
	platformCount,
	leftSpace,
}: ConfigCreatePlatforms): IPlatform[] {
	const result = [];
	const platformGap = 600 / platformCount;

	for (let i = 0; i < platformCount; i++) {
		const newPlatformBottom = 100 + i * platformGap;

		let left;

		if (i === 0) {
			left = leftSpace;
		}

		const newPlatform = createPlatform(screen, newPlatformBottom, left);

		result.push(newPlatform);
	}

	return result;
}

export function movePlatforms(
	platforms: IPlatform[],
	bottomSpace: number
): void {
	if (bottomSpace > 150) {
		platforms.forEach(platform => {
			platform.bottom -= 2;
			platform.element.style.bottom = `${platform.bottom}px`;

			if (platform.bottom <= 5) {
				platform.bottom = 600;
				platform.left = Math.random() * 315;
			}
		});
	}
}
