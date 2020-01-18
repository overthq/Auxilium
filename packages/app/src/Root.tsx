import React from 'react';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { getUserData } from './helpers/auth';

const Root = () => {
	const [fontsLoaded, setFontsLoaded] = React.useState(false);
	const [loggedIn, setLoggedIn] = React.useState(false);

	const verifyUser = async () => {
		const user = await getUserData();
		setLoggedIn(!!user);
	};

	const loadFonts = async () => {
		await Font.loadAsync({
			'Rubik Regular': require('../assets/fonts/Rubik-Regular.ttf'),
			'Rubik Medium': require('../assets/fonts/Rubik-Medium.ttf')
		});
		setFontsLoaded(true);
	};

	React.useEffect(() => {
		verifyUser();
		loadFonts();
		StatusBar.setBarStyle('light-content');
	}, []);

	if (!fontsLoaded) return <AppLoading />;
	return <AppNavigator {...{ loggedIn }} />;
};

export default Root;
