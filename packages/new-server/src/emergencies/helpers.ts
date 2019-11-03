import fetch from 'node-fetch';
import { Emergency } from '../models';
import { RequestHandler } from 'express';

interface CoordPair {
	[key: string]: string | number;
}

const { MAPBOX_ACCESS_TOKEN } = process.env;
const MAPBOX_BASE_URL = 'https://api.mapbox.com/directions/v5';
const MAPBOX_GEOCODING_BASE_URL = 'https://api.mapbox.com/geocoding/v5';

export const findNearbyEmergencies = async (
	longitude: number | string,
	latitude: number | string
) => {
	const emergencies = await Emergency.find({
		location: {
			$near: {
				$maxDistance: 1000,
				$geometry: {
					type: 'Point',
					coordinates: [Number(longitude), Number(latitude)]
				}
			}
		}
	}).find();
	return emergencies;
};

export const getAddress = async ({ longitude, latitude }: CoordPair) => {
	const queryString = `${longitude},${latitude}`;
	try {
		const response = await fetch(
			`${MAPBOX_GEOCODING_BASE_URL}/mapbox.places/${queryString}.json?access_token=${MAPBOX_ACCESS_TOKEN}`
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
