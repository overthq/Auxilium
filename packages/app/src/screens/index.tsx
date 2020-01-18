import React from 'react';
import { Notifications } from 'expo';
import { Notification } from 'expo/build/Notifications/Notifications.types';
import Onboarding from './Onboarding';
import Overview from './Overview';
import { EmergencyContext } from '../contexts/EmergencyContext';

const AppNavigator: React.FC<{ loggedIn: boolean }> = ({ loggedIn }) => {
	const { openEmergency } = React.useContext(EmergencyContext);
	const handleNotification = ({ origin, data }: Notification) => {
		if (origin === 'selected') openEmergency(data);
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
