import React from 'react';
import { AppLoading, Asset, Font, TaskManager } from 'expo';
import { connect } from 'react-redux';
import { StatusBar } from 'react-native';
import AppNavigator, { NavigationService } from './screens';
import { LocationActions, EmergenciesActions } from './redux/actions';
import { LOCATION_TASK, getBackgroundUpdates } from './tasks';
import { Emergencies } from './api';

interface RootState {
	fontsLoaded: boolean;
}
interface RootProps {
	locate(): Promise<void>;
	fetchEmergencies(): Promise<void>;
}

class Root extends React.Component<RootProps, RootState> {
	constructor(props: RootProps) {
		super(props);
		const { locate, fetchEmergencies } = props;
		locate();
		fetchEmergencies();
		getBackgroundUpdates();
		this.state = {
			fontsLoaded: false
		};
	}

	componentDidMount() {
		this.loadFonts();
	}

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
	if (error) console.log(error);
	if (data) {
		const { locations } = data;
		const {
			coords: { longitude, latitude }
		} = locations[0];
		setInterval(
			Emergencies.managePushNotifications({ longitude, latitude }),
			1000
		);
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
