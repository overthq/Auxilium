import { Constants, Notifications } from 'expo';
import { Alert } from 'react-native';
import env from '../../env';

const auth = async (): Promise<void> => {
	const pushToken = await Notifications.getExpoPushTokenAsync();
	try {
		const response = await fetch(`${env.apiUrl}auth`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ deviceId: Constants.deviceId, pushToken })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default auth;
