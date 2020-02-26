import { ToggleThemeAction, Theme, TOGGLE_THEME } from './types';
import lightMapStyle from '../../styles/lightMapStyle';
import darkMapStyle from '../../styles/darkMapStyle';

const themes: Record<'light' | 'dark', Theme> = {
	light: {
		name: 'light',
		primaryColor: '#D3D3D3',
		secondaryColor: '#505050',
		tertiaryColor: '#777777',
		transluscentColor: 'rgba(0, 0, 0, 0.7)',
		mapStyle: lightMapStyle
	},
	dark: {
		name: 'dark',
		primaryColor: '#202020',
		secondaryColor: '#D3D3D3',
		tertiaryColor: '#D3D3D3',
		transluscentColor: 'rgba(0, 0, 0, 0.3)',
		mapStyle: darkMapStyle
	}
};

const initialState: Theme = themes.dark;

const themeReducer = (state = initialState, action: ToggleThemeAction) =>
	action.type === TOGGLE_THEME ? themes[action.payload.theme] : state;

export default themeReducer;
