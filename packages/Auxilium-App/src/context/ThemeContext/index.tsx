import React from 'react';
import darkMapStyle from './darkMapStyle';

const { Provider, Consumer } = React.createContext({});

const themes = {
	dark: {
		name: 'dark',
		mapStyle: darkMapStyle,
		backgroundColor: '#505050',
		textColor: '#D3D3D3'
	},
	light: {
		name: 'light',
		mapStyle: [],
		backgroundColor: '#FFFFFF',
		textColor: '#000000'
	}
};

export class ThemeProvider extends React.Component<{}, { theme: any }> {
	state = {
		theme: themes.dark
	};

	toggleTheme = (theme: 'dark' | 'light') => {
		this.setState({ theme: themes[theme] });
	};

	render() {
		const { children } = this.props;
		const { toggleTheme } = this;
		const { theme } = this.state;
		return <Provider value={{ theme, toggleTheme }}>{children}</Provider>;
	}
}

export const ThemeConsumer = Consumer;
