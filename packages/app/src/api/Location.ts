import env from '../../env';

const getRoute = async (
	from: EmergencyCoordinates,
	to: EmergencyCoordinates
) => {
	const { longitude: fromLongitude, latitude: fromLatitude } = from;
	const { longitude: toLongitude, latitude: toLatitude } = to;
	try {
		const response = await fetch(
			`${env.apiUrl}location/get-route?from=${fromLongitude},${fromLatitude}&to=${toLongitude},${toLatitude}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { route } = await response.json();
		return route;
	} catch (error) {
		console.log(error);
	}
};

export const getAddress = async ({
	longitude,
	latitude
}: EmergencyCoordinates) => {
	try {
		const response = await fetch(
			`${env.apiUrl}location/get-address?longitude=${longitude}&latitude=${latitude}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { address } = await response.json();
		return address;
	} catch (error) {
		console.log(error);
	}
};

export default { getRoute, getAddress };
