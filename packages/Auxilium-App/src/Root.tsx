import React from 'react';
import { AppLoading, Asset, Font, TaskManager } from 'expo';
import { connect } from 'react-redux';
import { YellowBox, StatusBar } from 'react-native';
import AppNavigator, { NavigationService } from './screens';
import { LocationActions } from './redux/actions';
import { getBackgroundUpdates, LOCATION_TASK } from './tasks';
import { Emergencies } from './api';

interface RootState {
	fontsLoaded: boolean;
}
interface RootProps {
	locate(): Promise<void>;
}

class Root extends React.Component<RootProps, RootState> {
	state = {
		fontsLoaded: false
	};

	componentDidMount() {
		const { locate } = this.props;
		this.ignoreSocketWarnings();
		this.checkUserAuth();
		this.loadFonts();
		locate();
		getBackgroundUpdates();
	}

	checkUserAuth = () => {};

	loadFonts = async () => {
		await Font.loadAsync({
			/* eslint-disable global-require */
			'Rubik Regular': require('../assets/fonts/Rubik-Regular.ttf'),
			'Rubik Medium': require('../assets/fonts/Rubik-Medium.ttf'),
			'Rubik Bold': require('../assets/fonts/Rubik-Bold.ttf'),
			'Rubik Black': require('../assets/fonts/Rubik-Black.ttf')
		});
		this.setState({ fontsLoaded: true });
	};

	loadAssets = () => {
		const images = [
			require('../assets/Notify.png'),
			require('../assets/Help_Others.png'),
			require('../assets/Security.png')
		];
		images.map(image => {
			return Asset.fromModule(image).downloadAsync();
		});
	};

	ignoreSocketWarnings = () => {
		console.ignoredYellowBox = ['Remote debugger'];
		YellowBox.ignoreWarnings([
			'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
		]);
	};

	render() {
		const { fontsLoaded } = this.state;
		StatusBar.setBarStyle('light-content');
		if (!fontsLoaded) return <AppLoading />;
		return (
			<AppNavigator
				ref={(navigatorRef: any) => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
	if (error) {
		console.log(error);
	}

	if (data) {
		const { locations } = data;
		console.log(locations);
		// Study the structure of the locations object.
		// I think it should look like this:
		// [{ ..., coordinates: { longitude, latitude } }, ...]
		Emergencies.managePushNotifications(locations);
	}
});

const mapDispatchToProps = { locate: LocationActions.locate };

export default connect(
	null,
	mapDispatchToProps
)(Root);
