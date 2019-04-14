import React from 'react';
import { AppLoading, Asset, Font, TaskManager } from 'expo';
import { connect } from 'react-redux';
import { YellowBox, StatusBar } from 'react-native';
import AppNavigator, { NavigationService } from './screens';
import { LocationActions } from './redux/actions';
import { ThemeConsumer } from './context/index';
import { getBackgroundUpdates, LOCATION_TASK } from './tasks';

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
		if (!fontsLoaded) {
			return <AppLoading />;
		}
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<>
						<StatusBar
							barStyle={
								theme.name === 'dark' ? 'light-content' : 'dark-content'
							}
						/>
						<AppNavigator
							ref={(navigatorRef: any) => {
								NavigationService.setTopLevelNavigator(navigatorRef);
							}}
						/>
					</>
				)}
			</ThemeConsumer>
		);
	}
}

const { data, error } = TaskManager.defineTask(LOCATION_TASK);

if (error) {
	console.log(error);
}

if (data) {
	const { locations } = data;
	console.log(locations);
	// Pass this to the backend for further use.
	(async () => {
		const response = await fetch(``, {
			method: 'GET',
			headers: {
				Accept: 'application/json'
			},
		});
	})();
}

const mapDispatchToProps = { locate: LocationActions.locate };

export default connect(
	null,
	mapDispatchToProps
)(Root);
