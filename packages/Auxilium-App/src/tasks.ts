import { Location } from 'expo';
import { Emergencies } from './api';

export const LOCATION_TASK = 'background-location-task';

export const getBackgroundUpdates = async () => {
	const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
	if (!started) {
		await Location.startLocationUpdatesAsync(LOCATION_TASK, {
			accuracy: Location.Accuracy.High
		});
	}
};

export const pushNotifications = async (
	longitude: number,
	latitude: number
) => {
	await Emergencies.managePushNotifications({ longitude, latitude });
};
