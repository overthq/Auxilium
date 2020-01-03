import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { checkAuthStatus } from './helpers/auth';

const Root = () => {
	const [fontsLoaded, setFontsLoaded] = React.useState(false);
	const [loggedIn, setLoggedIn] = React.useState(false);

	const prepare = async () => {
		const status = await checkAuthStatus();
		setLoggedIn(!!status);
		StatusBar.setBarStyle('light-content');
		return Font.loadAsync({
			'Rubik Regular': require('../assets/fonts/Rubik-Regular.ttf'),
			'Rubik Medium': require('../assets/fonts/Rubik-Medium.ttf'),
			'Rubik Bold': require('../assets/fonts/Rubik-Bold.ttf')
		});
	};

	if (!fontsLoaded) {
		return (
			<AppLoading startAsync={prepare} onFinish={() => setFontsLoaded(true)} />
		);
	}

	return <AppNavigator {...{ loggedIn }} />;
};

export default Root;
