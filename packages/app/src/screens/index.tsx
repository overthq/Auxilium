import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import { Notification } from 'expo/build/Notifications/Notifications.types';
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

	const handleNotification = (notification: Notification) => {
		if (notification && notification.origin === 'selected') {
			NavigationService.navigate('EmergencyDetails', {
				details: notification.data
			});
		}
	};

	React.useEffect(() => {
		const notificationSubscription = Notifications.addListener(
			handleNotification
		);
		return () => {
			notificationSubscription.remove();
		};
	}, []);

	return (
		<Navigator
			ref={navigatorRef => {
				navigatorRef && NavigationService.setTopLevelNavigator(navigatorRef);
			}}
		/>
	);
};

export default AppNavigator;
