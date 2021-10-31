import React from 'react';
import { StatusBar } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Notifications from 'expo-notifications';
import AppNavigator from './screens';
import { LOCATION_TASK, getBackgroundUpdates } from './helpers/tasks';
import { cacheLocation } from './api/Emergencies';
import { EmergencyContext } from './contexts/EmergencyContext';

const Root: React.FC = () => {
	const { openEmergency } = React.useContext(EmergencyContext);

	React.useEffect(() => {
		getBackgroundUpdates();
		StatusBar.setBarStyle('light-content');

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

	return <AppNavigator />;
};

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
	if (error) console.error(error.message);
	if (data) {
		const { locations } = data;
		console.log({ locations });
		const {
			coords: { longitude, latitude }
		} = locations[0] as { coords: EmergencyCoordinates };
		cacheLocation({ longitude, latitude });
	}
});

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

export default Root;
