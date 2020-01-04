import haversine from 'haversine';

export const getDistance = (
	from: EmergencyCoordinates,
	to: EmergencyCoordinates
) => {
	const distance = haversine(from, to);

	if (distance <= 500) {
		return `${(distance / 1000).toFixed(1)}m away`;
	}

	return `${distance}km away`;
};
