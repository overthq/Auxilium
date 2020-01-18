import { ToggleThemeAction, TOGGLE_THEME } from './types';

const initialState = { theme: 'dark' };

const themeReducer = (state = initialState, action: ToggleThemeAction) => {
	switch (action.type) {
		case TOGGLE_THEME:
			return { theme: action.payload.theme };
		default:
			return state;
	}
};

export default themeReducer;
