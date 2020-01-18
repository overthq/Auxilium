import { MapStyleElement } from 'react-native-maps';
export const TOGGLE_THEME = 'TOGGLE_THEME';

export interface ToggleThemeAction {
	type: typeof TOGGLE_THEME;
	payload: { theme: 'light' | 'dark' };
}

export interface Theme {
	name: 'light' | 'dark';
	primaryColor: string;
	secondaryColor: string;
	transluscentColor: string;
	mapStyle: MapStyleElement[];
}
