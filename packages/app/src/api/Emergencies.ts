import env from '../../env';
import { getUserData } from '../helpers/auth';

export const getNearbyEmergencies = async ({
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

export const reportEmergency = async (
	description: string,
	{ longitude, latitude }: EmergencyCoordinates
) => {
	try {
		const user = await getUserData();
		if (!user) return;

		const response = await fetch(`${env.apiUrl}emergencies/report`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: user._id,
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

export const getUserHistory = async () => {
	try {
		const user = await getUserData();
		if (!user) return;
		const response = await fetch(
			`${env.apiUrl}emergencies/history?userId=${user._id}`,
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

export const managePushNotifications = async ({
	longitude,
	latitude
}: EmergencyCoordinates) => {
	try {
		const user = await getUserData();
		if (!user) return;
		const { pushToken } = user;
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
