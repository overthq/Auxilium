import * as Location from 'expo-location';

export const LOCATION_TASK = 'background-location-task';

export const getBackgroundUpdates = async (): Promise<void> => {
	const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);

	if (!started) {
		await Location.startLocationUpdatesAsync(LOCATION_TASK, {
			accuracy: Location.Accuracy.Low,
			timeInterval: 60000,
			distanceInterval: 250
		});
	}
};
