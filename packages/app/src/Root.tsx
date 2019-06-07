import React from 'react';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as TaskManager from 'expo-task-manager';
import { AppLoading } from 'expo';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import AppNavigator from './screens';
import { LocationActions, EmergenciesActions } from './redux/actions';
import { LOCATION_TASK, getBackgroundUpdates } from './tasks';
import { Emergencies } from './api';
import { AuthHelpers } from './helpers';

interface RootProps {
	locate(): void;
	fetchEmergencies(): void;
}

const Root = (props: RootProps) => {
	const { fetchEmergencies } = props;
	const [fontsLoaded, setFontsLoaded] = React.useState(false);
	const [loggedIn, setLoggedIn] = React.useState(false);

	const preload = async () => {
		const status = await AuthHelpers.checkAuthStatus();
		setLoggedIn(!!status);
	};

	React.useEffect(() => {
		loadAssets();
		loadFonts();
		preload();
		fetchEmergencies();
		getBackgroundUpdates();
		StatusBar.setBarStyle('light-content');
	}, []);

	const loadFonts = async () => {
		await Font.loadAsync({
			/* eslint-disable global-require */
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
		images.map(image => {
			return Asset.fromModule(image).downloadAsync();
		});
	};

	if (!fontsLoaded) return <AppLoading />;
	return <AppNavigator {...{ loggedIn }} />;
};

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
	if (error) console.log(error);
	if (data) {
		const { locations } = data;
		const {
			coords: { longitude, latitude }
		} = locations[0] as { coords: Coordinates };
		setInterval(() => {
			Emergencies.managePushNotifications({ longitude, latitude });
		}, 1000);
	}
});

const mapDispatchToProps = {
	locate: LocationActions.locate,
	fetchEmergencies: EmergenciesActions.fetchEmergencies
};

export default connect(
	null,
	mapDispatchToProps
)(Root);
