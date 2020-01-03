import { RequestHandler } from 'express';
import fetch from 'node-fetch';
import env from '../config/env';

type Pair = [number, number];

const MAPBOX_BASE_URL = 'https://api.mapbox.com/directions/v5';
const MAPBOX_GEOCODING_BASE_URL = 'https://api.mapbox.com/geocoding/v5';

export const getRoute: RequestHandler = async (req, res) => {
	const { from, to } = req.query;
	const [fromLongitude, fromLatitude] = from.split(',');
	const [toLongitude, toLatitude] = to.split(',');
	const queryString = `${fromLongitude},${fromLatitude};${toLongitude},${toLatitude}`;
	try {
		const response = await fetch(
			`${MAPBOX_BASE_URL}/mapbox/walking/${queryString}.json?access_token=${env.MAPBOX_ACCESS_TOKEN}&geometries=geojson`
		);
		const { routes } = await response.json();
		const { coordinates }: { coordinates: Pair[] } = routes[0].geometry;
		const route = coordinates.map(([longitude, latitude]) => ({
			longitude,
			latitude
		}));
		return res.status(200).json({
			success: true,
			message: 'Route fetched successfully',
			route
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error occurred while fetching the route information',
			error
		});
	}
};

export const getAddress: RequestHandler = async (req, res) => {
	const { longitude, latitude } = req.query;
	const queryString = `${longitude},${latitude}`;
	try {
		const response = await fetch(
			`${MAPBOX_GEOCODING_BASE_URL}/mapbox.places/${queryString}.json?access_token=${env.MAPBOX_ACCESS_TOKEN}`
		);
		const { features } = await response.json();
		return res.status(200).json({
			success: true,
			message: 'Successfully retrieved address',
			address: features[2].place_name
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error occurred while looking up the address',
			error
		});
	}
};
