import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import NavigationService from './NavigationService';
import Onboarding from './Onboarding';
import Main from './Main';

interface AppNavigatorProps {
	loggedIn: boolean;
}

const AppNavigator = ({ loggedIn }: AppNavigatorProps) => {
	const Navigator = createAppContainer(
		createSwitchNavigator(
			{ Onboarding, Main },
			{
				initialRouteName: loggedIn ? 'Main' : 'Onboarding',
				backBehavior: 'none'
			}
		)
	);
	return (
		<Navigator
			ref={navigatorRef => {
				navigatorRef && NavigationService.setTopLevelNavigator(navigatorRef);
			}}
		/>
	);
};

export default AppNavigator;
