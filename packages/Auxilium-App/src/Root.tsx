import React from 'react';
import { connect } from 'react-redux';
import AppNavigator, { NavigationService } from './screens';
import locate from './redux/actions/Location';
import getEmergencies from './redux/actions/Emergencies';

interface RootProps {
	locate(): Promise<void>;
	getEmergencies(): Promise<void>;
}

const Root = (props: RootProps) => {
	const checkUserAuth = () => {};

	React.useEffect(() => {
		checkUserAuth();
		props.locate();
		props.getEmergencies();
	}, []);

	return (
		<AppNavigator
			ref={navigatorRef => {
				NavigationService.setTopLevelNavigator(navigatorRef);
			}}
		/>
	);
};

const mapDispatchToProps = { locate, getEmergencies };

export default connect(
	null,
	mapDispatchToProps
)(Root);
