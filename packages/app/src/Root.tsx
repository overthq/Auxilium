import React from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as TaskManager from 'expo-task-manager';
import { AppLoading, Notifications } from 'expo';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { LOCATION_TASK, getBackgroundUpdates } from './tasks';
import { Emergencies } from './api';
import { AuthHelpers } from './helpers';

const Root = () => {
	const [fontsLoaded, setFontsLoaded] = React.useState(false);
	const [loggedIn, setLoggedIn] = React.useState(false);
	const [notification, setNotification] = React.useState(null);

	const preload = async () => {
		const status = await AuthHelpers.checkAuthStatus();
		setLoggedIn(!!status);
	};

	React.useEffect(() => {
		loadAssets();
		loadFonts();
		preload();
		getBackgroundUpdates();
		StatusBar.setBarStyle('light-content');
		const notificationSubsctiption = Notifications.addListener(
			handleNotification
		);
		return () => {
			notificationSubsctiption.remove();
		};
	}, []);

	const handleNotification = (notification: any) => {
		return setNotification(notification);
	};

	const loadFonts = async () => {
		await Font.loadAsync({
			'Rubik Regular': require('../assets/fonts/Rubik-Regular.ttf'),
			'Rubik Medium': require('../assets/fonts/Rubik-Medium.ttf'),
			'Rubik Bold': require('../assets/fonts/Rubik-Bold.ttf'),
			'Rubik Black': require('../assets/fonts/Rubik-Black.ttf')
		});
		setFontsLoaded(true);
	};

	const loadAssets = () => {
		const images = [
			require('../assets/Notify.png'),
			require('../assets/Help_Others.png'),
			require('../assets/Security.png')
		];
		images.map(image => Asset.fromModule(image).downloadAsync());
	};

	if (!fontsLoaded) return <AppLoading />;
	if (notification) console.log(notification); // Inspect this and see what it has
	return <AppNavigator {...{ loggedIn }} />;
};

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
	if (error) console.log(error);
	if (data) {
		const { locations } = data;
		const {
			coords: { longitude, latitude }
		} = locations[0] as { coords: EmergencyCoordinates };
		setInterval(() => {
			Emergencies.managePushNotifications({ longitude, latitude });
		}, 10000);
	}
});

export default Root;
