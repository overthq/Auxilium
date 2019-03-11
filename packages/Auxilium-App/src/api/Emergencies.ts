import { Alert } from 'react-native';
import io from 'socket.io-client';
import env from '../../env';

const socket = io(env.apiUrl);

interface Coordinates {
	longitude: number;
	latitude: number;
}

interface Emergency {
	deviceId: string;
	coordinates: Coordinates;
}

const getNearbyEmergencies = async (
	coordinates: Coordinates
): Promise<Emergency[] | void> => {
	try {
		const response = await fetch(`${env.apiUrl}emergencies/get`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ coordinates })
		});
		const { emergencies } = await response.json();
		return emergencies;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { getNearbyEmergencies };
