import { TOGGLE_THEME } from './types';
import { AppThunk } from '../../../store';

export const toggleTheme = (): AppThunk => async (dispatch, getState) => {
	const {
		theme: { name }
	} = getState();

	const themeName = name === 'dark' ? 'light' : 'dark';

	dispatch({ type: TOGGLE_THEME, payload: { theme: themeName } });
};
