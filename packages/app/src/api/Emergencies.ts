import { AsyncStorage } from 'react-native';
import Constants from 'expo-constants';
import env from '../../env';

const getNearbyEmergencies = async ({
	longitude,
	latitude
}: EmergencyCoordinates): Promise<Emergency[]> => {
	try {
		const response = await fetch(
			`${env.apiUrl}emergencies/get?longitude=${longitude}&latitude=${latitude}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { emergencies } = await response.json();
		return emergencies;
	} catch (error) {
		console.log(error.message);
		return [];
	}
};

const reportEmergency = async (
	description: string,
	{ longitude, latitude }: EmergencyCoordinates
) => {
	try {
		const response = await fetch(`${env.apiUrl}emergencies/report`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				deviceId: Constants.deviceId,
				description,
				coordinates: [longitude, latitude]
			})
		});
		await response.json();
	} catch (error) {
		console.log(error.message);
		return [];
	}
};

const getUserHistory = async () => {
	try {
		const response = await fetch(
			`${env.apiUrl}emergencies/history?deviceId=${Constants.deviceId}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { emergencies }: { emergencies: Emergency[] } = await response.json();
		return emergencies;
	} catch (error) {
		return console.log(error.message);
	}
};

const managePushNotifications = async ({
	longitude,
	latitude
}: EmergencyCoordinates) => {
	try {
		const pushToken = await AsyncStorage.getItem('pushToken');
		await fetch(
			`${env.apiUrl}emergencies/notifications?longitude=${longitude}&latitude=${latitude}&pushToken=${pushToken}`
		);
	} catch (error) {
		console.log(error.message);
	}
};

export default {
	getNearbyEmergencies,
	reportEmergency,
	getUserHistory,
	managePushNotifications
};
