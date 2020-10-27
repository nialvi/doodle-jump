import { renderDoodler } from '../doodler';

test('should render doodler on screen', () => {
	const screen = document.createElement('div');
	const doodler = document.createElement('div');

	renderDoodler({
		screen,
		doodler,
		leftSpace: 10,
		bottomSpace: 10,
	});

	expect(screen).toContainElement(doodler);
	expect(doodler).toHaveClass('doodler');
	expect(doodler).toHaveStyle({ left: '10px', bottom: '10px' });
});
