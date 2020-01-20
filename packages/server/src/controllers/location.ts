import fetch from 'node-fetch';
import { RequestHandler } from 'express';

type Pair = [number, number];

const MAPBOX_BASE_URL = 'https://api.mapbox.com/directions/v5';

export const getRoute: RequestHandler = async (req, res) => {
	const { from, to } = req.query;
	const [fromLongitude, fromLatitude] = from.split(',');
	const [toLongitude, toLatitude] = to.split(',');
	const queryString = `${fromLongitude},${fromLatitude};${toLongitude},${toLatitude}`;
	try {
		const response = await fetch(
			`${MAPBOX_BASE_URL}/mapbox/walking/${queryString}.json?access_token=${process.env.MAPBOX_ACCESS_TOKEN}&geometries=geojson`
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
