import { Constants } from 'expo';
import { Alert } from 'react-native';
// import io from 'socket.io-client';
import env from '../../env';

// const socket = io(env.apiUrl);

interface Coordinates {
	longitude: number;
	latitude: number;
}

interface Emergency {
	deviceId: string;
	coordinates: Coordinates;
}

const createEmergency = async (coordinates: Coordinates): Promise<void> => {
	try {
		const response = await fetch(`${env.apiUrl}emergencies/create`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ deviceId: Constants.deviceId, coordinates })
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return Alert.alert(error);
	}
};

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
		const data = await response.json();
		return data.emergencies;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { createEmergency, getNearbyEmergencies };
