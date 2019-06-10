import fetch from 'node-fetch';
import env from '../config/env';
import { RequestHandler } from 'express';
import console = require('console');

export const getRoute: RequestHandler = async (req, res) => {
	const { from, to } = req.query;
	const [fromLongitude, fromLatitude] = from.split(',');
	const [toLongitude, toLatitude] = to.split(',');
	try {
		const response = await fetch(
			`https://api.mapbox.com/directions/v5/mapbox/walking/${fromLongitude},${fromLatitude};${toLongitude},${toLatitude}.json?access_token=${env.MAPBOX_ACCESS_TOKEN}&geometries=geojson`
		);
		const { routes } = await response.json();
		const { coordinates } = routes[0].geometry;
		const route = await coordinates.map((coordinate: [number, number]) => ({
			longitude: coordinate[0],
			latitude: coordinate[1]
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
	console.log(req.query);
	const { longitude, latitude } = req.query;
	try {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=${env.MAPBOX_ACCESS_TOKEN}`
		);
		const data = await response.json();
		console.log(data);
		const { features } = data;
		return res.status(200).json({
			success: true,
			message: 'Successfully retrieved address',
			address: features[2].place_name
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			message: 'An error occurred while looking up the address',
			error
		});
	}
};
