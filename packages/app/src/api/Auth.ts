import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import env from '../../env';
import { storeUserData } from '../helpers/auth';

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
			'We require push notification permissions to provide our services.'
		);
	}
	const pushToken = await Notifications.getExpoPushTokenAsync();

	try {
		const response = await fetch(`${env.apiUrl}auth`, {
			method: 'POST',
			body: JSON.stringify({ pushToken })
		});

		const { user } = await response.json();
		if (response.ok) storeUserData(user);
	} catch (error) {
		return Alert.alert(error.message);
	}
};
