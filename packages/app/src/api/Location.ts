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

export const getAddress = async ({
	longitude,
	latitude
}: EmergencyCoordinates) => {
	const response = await fetch(
		`${env.apiUrl}location/get-address?longitude=${longitude}&latitude=${latitude}`
	);
	const { address } = await response.json();
	return address;
};
