import React from 'react';
import * as Notifications from 'expo-notifications';
import Onboarding from './Onboarding';
import Overview from './Overview';
import { EmergencyContext } from '../contexts/EmergencyContext';
import { useAppSelector } from '../../store';

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

const AppNavigator: React.FC = () => {
	const { openEmergency } = React.useContext(EmergencyContext);
	const user = useAppSelector(({ user }) => user.user);

	React.useEffect(() => {
		const notificationSubscription = Notifications.addNotificationResponseReceivedListener(
			({ notification }) => {
				openEmergency(
					(notification.request.content.data as unknown) as Emergency
				);
			}
		);
		return () => {
			notificationSubscription.remove();
		};
	}, []);

	// Add fallback for AUTH_LOADING state.
	return !!user ? <Overview /> : <Onboarding />;
};

export default AppNavigator;
