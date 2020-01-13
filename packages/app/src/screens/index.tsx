import React from 'react';
import { Notifications } from 'expo';
import { Notification } from 'expo/build/Notifications/Notifications.types';
import Onboarding from './Onboarding';
import Overview from './Overview';

interface AppNavigatorProps {
	loggedIn: boolean;
}

// This entire file should be moved to the Root when it works.
const AppNavigator: React.FC<AppNavigatorProps> = ({ loggedIn }) => {
	const handleNotification = ({ origin, data }: Notification) => {
		if (origin === 'selected') {
			// Open the overview page with the emergency data.
			// Still have to figure out how to access the page.
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

	return loggedIn ? <Overview /> : <Onboarding />;
};

export default React.memo(AppNavigator);
