import * as Location from 'expo-location';

export const LOCATION_TASK = 'background-location-task';

export const getBackgroundUpdates = async () => {
	const started = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK);
	if (!started) {
		await Location.startLocationUpdatesAsync(LOCATION_TASK, {
			accuracy: Location.Accuracy.Low,
			timeInterval: 50000,
			distanceInterval: 50
		});
	}
};
