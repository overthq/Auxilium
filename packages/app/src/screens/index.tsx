import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { Notifications } from 'expo';
import { Notification } from 'expo/build/Notifications/Notifications.types';
import NavigationService from './NavigationService';
import Onboarding from './Onboarding';
import Overview from './Overview';

interface AppNavigatorProps {
	loggedIn: boolean;
}

const AppNavigator = ({ loggedIn }: AppNavigatorProps) => {
	const Navigator = createAppContainer(
		createSwitchNavigator(
			{ Onboarding, Overview },
			{
				initialRouteName: loggedIn ? 'Overview' : 'Onboarding',
				backBehavior: 'none'
			}
		)
	);

	const handleNotification = (notification: Notification) => {
		if (notification.origin === 'selected') {
			// Handle the case
			// Open the DetailsModal on the Overview page.
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

export default React.memo(AppNavigator);
