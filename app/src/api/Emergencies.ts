import env from '../../env';
import { store } from '../../store';

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
	const {
		user: { user }
	} = store.getState();
	if (!user) return;

	const response = await fetch(`${env.apiUrl}emergencies/report`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			userId: user._id,
			longitude,
			latitude,
			...(description && { description })
		})
	});
	await response.json();
};

export const cacheLocation = async ({
	longitude,
	latitude
}: EmergencyCoordinates) => {
	const {
		user: { user }
	} = store.getState();
	if (!user) return;

	const { pushToken } = user;

	await fetch(`${env.apiUrl}emergencies/cache-location`, {
		method: 'POST',
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ longitude, latitude, pushToken })
	});
};
