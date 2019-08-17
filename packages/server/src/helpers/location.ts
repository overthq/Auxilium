import fetch from 'node-fetch';
import env from '../config/env';

const MAPBOX_GEOCODING_BASE_URL = 'https://api.mapbox.com/geocoding/v5';

interface CoordPair {
	[key: string]: string | number;
}

export const getAddress = async ({ longitude, latitude }: CoordPair) => {
	const queryString = `${longitude},${latitude}`;
	try {
		const response = await fetch(
			`${MAPBOX_GEOCODING_BASE_URL}/mapbox.places/${queryString}.json?access_token=${env.MAPBOX_ACCESS_TOKEN}`
		);
		const { features } = await response.json();
		return features[2].place_name;
	} catch (error) {
		throw new Error(error.message);
	}
};

export const coordTupleToObject = (pair: [number, number]) => {
	const [longitude, latitude] = pair;
	return { longitude, latitude };
};
