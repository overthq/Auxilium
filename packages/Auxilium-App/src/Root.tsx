import React from 'react';
import { Font, AppLoading } from 'expo';
import { connect } from 'react-redux';
import AppNavigator, { NavigationService } from './screens';
import locate from './redux/actions/Location';

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
		this.checkUserAuth();
		this.loadFonts();
		this.props.locate();
	}

	checkUserAuth = () => {};

	loadFonts = async () => {
		await Font.loadAsync({
			/* eslint-disable global-require */
			'Muli Regular': require('../assets/fonts/Muli-Regular.ttf'),
			'Muli SemiBold': require('../assets/fonts/Muli-SemiBold.ttf'),
			'Muli Bold': require('../assets/fonts/Muli-Bold.ttf'),
			'Muli Black': require('../assets/fonts/Muli-Black.ttf')
		});
		this.setState({ fontsLoaded: true });
	};

	render() {
		const { fontsLoaded } = this.state;
		if (!fontsLoaded) {
			return <AppLoading />;
		}
		return (
			<AppNavigator
				ref={(navigatorRef: any) => {
					NavigationService.setTopLevelNavigator(navigatorRef);
				}}
			/>
		);
	}
}

const mapDispatchToProps = { locate };

export default connect(
	null,
	mapDispatchToProps
)(Root);
