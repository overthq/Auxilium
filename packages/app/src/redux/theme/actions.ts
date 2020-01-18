import { TOGGLE_THEME } from './types';
import { AppThunk } from '../../../store';

export const toggleTheme = (): AppThunk => async (dispatch, getState) => {
	const {
		theme: { theme: currentTheme }
	} = getState();

	const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

	dispatch({ type: TOGGLE_THEME, payload: { theme: newTheme } });
};
