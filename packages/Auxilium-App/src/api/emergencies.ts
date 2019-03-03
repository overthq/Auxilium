import { Constants } from 'expo';
import { Alert } from 'react-native';
import env from '../../env';

interface Coordinates {
	longitude: number;
	latitude: number;
}

const createEmergency = async (coords: Coordinates): Promise<void> => {
	try {
		const response = await fetch(`${env.apiUrl}emergencies/create`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ deviceId: Constants.deviceId, coords })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return Alert.alert(error);
	}
};

export default { createEmergency };
