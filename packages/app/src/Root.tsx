import React from 'react';
import { StatusBar } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import * as TaskManager from 'expo-task-manager';
import AppNavigator from './screens';
import { LOCATION_TASK, getBackgroundUpdates } from './helpers/tasks';
import { cacheLocation } from './api/Emergencies';
import { useAppSelector } from '../store';

const Root = () => {
	const [fontsLoaded, setFontsLoaded] = React.useState(false);
	const user = useAppSelector(({ user }) => user.user);

	const loadFonts = async () => {
		await Font.loadAsync({
			'Rubik Regular': require('../assets/fonts/Rubik-Regular.ttf'),
			'Rubik Medium': require('../assets/fonts/Rubik-Medium.ttf')
		});
		setFontsLoaded(true);
	};

	React.useEffect(() => {
		loadFonts();
		getBackgroundUpdates();
		StatusBar.setBarStyle('light-content');
	}, []);

	if (!fontsLoaded) return <AppLoading />;
	return <AppNavigator loggedIn={!!user} />;
};

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
	if (error) console.error(error.message);
	if (data) {
		const { locations } = data;
		console.log({ locations });
		const {
			coords: { longitude, latitude }
		} = locations[0] as { coords: EmergencyCoordinates };
		cacheLocation({ longitude, latitude });
	}
});

export default Root;
