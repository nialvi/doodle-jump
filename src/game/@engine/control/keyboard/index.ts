import { IControl } from '../entities/interface';

export const init = ({ left, right }: IControl) => (e: KeyboardEvent): void => {
	switch (e.key) {
		case 'ArrowLeft': {
			left();
			break;
		}

		case 'ArrowRight': {
			right();
			break;
		}

		default:
			break;
	}
};
