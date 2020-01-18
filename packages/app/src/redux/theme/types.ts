export const TOGGLE_THEME = 'TOGGLE_THEME';

export interface ToggleThemeAction {
	type: typeof TOGGLE_THEME;
	payload: { theme: 'light' | 'dark' };
}
