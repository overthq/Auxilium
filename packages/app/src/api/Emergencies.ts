import { getUserData } from '../helpers/auth';
import env from '../../env';

export const getNearbyEmergencies = async ({
	longitude,
	latitude
}: EmergencyCoordinates): Promise<Emergency[]> => {
	const response = await fetch(
		`${env.apiUrl}emergencies/get?longitude=${longitude}&latitude=${latitude}`
	);
	const { emergencies } = await response.json();
	return emergencies;
};

export const reportEmergency = async (
	{ longitude, latitude }: EmergencyCoordinates,
	description?: string
) => {
	const user = await getUserData();
	if (!user) return;

	const response = await fetch(`${env.apiUrl}emergencies/report`, {
		method: 'POST',
		body: JSON.stringify({
			userId: user._id,
			coordinates: [longitude, latitude],
			...(description && { description })
		})
	});
	await response.json();
};

export const managePushNotifications = async ({
	longitude,
	latitude
}: EmergencyCoordinates) => {
	const user = await getUserData();
	if (!user) return;
	const { pushToken } = user;
	await fetch(
		`${env.apiUrl}emergencies/notifications?longitude=${longitude}&latitude=${latitude}&pushToken=${pushToken}`
	);
};
