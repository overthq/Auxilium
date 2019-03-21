import React from 'react';
import darkMapStyle from './darkMapStyle';

const { Provider, Consumer } = React.createContext({});

const darkTheme = {
	mapStyle: darkMapStyle,
	backgroundColor: '#505050',
	textColor: '#D3D3D3'
};

const lightTheme = {
	mapStyle: [],
	backgroundColor: '#505050',
	textColor: '#D3D3D3'
};

export class ThemeProvider extends React.Component<{}, { dark: boolean }> {
	state = {
		dark: true
	};

	toggleTheme = () => {
		this.setState(state => ({
			dark: !state.dark
		}));
	};

	render() {
		const { children } = this.props;
		const { dark } = this.state;
		const { toggleTheme } = this;
		return (
			<Provider
				value={{
					dark,
					theme: dark ? darkTheme : lightTheme,
					toggleTheme
				}}
			>
				{children}
			</Provider>
		);
	}
}

export const ThemeConsumer = Consumer;
