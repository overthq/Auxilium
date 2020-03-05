import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import env from '../../env';

export const authenticate = async (): Promise<void> => {
	const { status: existingStatus } = await Permissions.getAsync(
		Permissions.NOTIFICATIONS
	);
	let finalStatus = existingStatus;
	if (existingStatus !== 'granted') {
		const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
		finalStatus = status;
	} else if (finalStatus !== 'granted') {
		Alert.alert(
			'We require push notification permissions to provide our services. (This application cannot function in a simulator for this reason)'
		);
	}
	const pushToken = await Notifications.getExpoPushTokenAsync();

	const response = await fetch(`${env.apiUrl}auth`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ pushToken })
	});

	const { user } = await response.json();
	if (!user) throw new Error('Authentication unsuccessfull');
	return user;
};
