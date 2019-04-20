import { Alert } from 'react-native';

const MAPBOX_ACCESS_TOKEN =
	'pk.eyJ1Ijoia29yZWRlMzYwIiwiYSI6ImNqZno1MGN2YjBhOTgyd2xlbWFhMGQ3dmwifQ.1AbAu_Ga4bu4iQCnOgBfog';

const getAddressFromCoords = async ({ longitude, latitude }: Coordinates) => {
	try {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
		);
		const { features } = await response.json();
		return features[2].place_name;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

const getNavigationRoute = async (from: Coordinates, to: Coordinates) => {
	const { longitude: fromLongitude, latitude: fromLatitude } = from;
	const { longitude: toLongitude, latitude: toLatitude } = to;
	try {
		const response = await fetch(
			`https://api.mapbox.com/directions/v5/mapbox/walking/${fromLongitude},${fromLatitude};${toLongitude},${toLatitude}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
		);
		const { waypoints } = await response.json();
		const coordinates = waypoints.map((waypoint: any) => {
			return {
				longitude: waypoint.location[0],
				latitude: waypoint.location[1]
			};
		});
		return coordinates;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { getAddressFromCoords, getNavigationRoute };
