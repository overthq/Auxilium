import { Constants } from 'expo';
import { Alert } from 'react-native';
import env from '../../env';

const logIn = async (): Promise<void> => {
	try {
		const response = await fetch(env.apiUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ deviceId: Constants.deviceId })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

const register = async (firstName: string, lastName: string): Promise<void> => {
	try {
		const response = await fetch(env.apiUrl, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				firstName,
				lastName,
				deviceId: Constants.deviceId
			})
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { logIn, register };
