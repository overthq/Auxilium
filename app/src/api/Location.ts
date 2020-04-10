import env from '../../env';

export const getRoute = async (
	from: EmergencyCoordinates,
	to: EmergencyCoordinates
) => {
	const { longitude: fromLongitude, latitude: fromLatitude } = from;
	const { longitude: toLongitude, latitude: toLatitude } = to;
	const response = await fetch(
		`${env.apiUrl}location/get-route?from=${fromLongitude},${fromLatitude}&to=${toLongitude},${toLatitude}`
	);
	const { route } = await response.json();
	return route;
};
