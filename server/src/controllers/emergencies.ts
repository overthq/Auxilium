import util from 'util';
import { RequestHandler } from 'express';
import { Emergency, User } from '../models';
import { findNearbyEmergencies } from '../helpers/emergencies';
import { sendNotifications } from '../helpers/notifications';
import client from '../config/redis';

const georadius = util.promisify(client.georadius).bind(client);

export const getNearbyEmergencies: RequestHandler = async (req, res) => {
	const { longitude, latitude } = req.query;
	try {
		const emergencies = await findNearbyEmergencies(longitude, latitude);
		return res.status(200).json({
			success: true,
			emergencies
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.',
			error
		});
	}
};

export const reportEmergency: RequestHandler = async (req, res) => {
	const { userId, longitude, latitude, description } = req.body;
	try {
		const emergency = await Emergency.create({
			user: userId,
			description,
			location: {
				type: 'Point',
				coordinates: [longitude, latitude]
			}
		});

		res.status(201).json({
			success: true,
			message: 'Emergency successfully created.',
			emergency
		});

		const results = await georadius(
			'emergencies',
			longitude,
			latitude,
			'1',
			'km',
			'WITHCOORD',
			'WITHDIST'
		);

		sendNotifications(
			results.map((result: (string | string[])[]) => ({
				pushToken: result[0],
				distance: result[1],
				longitude: result[2][0],
				latitude: result[2][1]
			}))
		);
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.',
			error
		});
	}
};

export const getUserEmergencies: RequestHandler = async (req, res) => {
	const { userId } = req.query;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: `User not found`
			});
		}
		const emergencies = await Emergency.find({ user: user.id });
		return res.status(200).json({
			success: true,
			emergencies
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.'
		});
	}
};

export const cacheLocation: RequestHandler = async (req, res) => {
	const { longitude, latitude, pushToken } = req.body;
	// If Redis does not do updating, we should run this to remove the previous entry:
	// Also, we might have to check that the key exists before running ZREM (to avoid any errors)
	// In the future, is there a way to add a timestamp to the location being cached?
	// If this is possible, it would be easy to implement a timeline of the locations visited by a user.
	// Which would be useful for tracking the spread of some communicable diseases like COVID-19.
	// It would also be very secure, as the pushToken, which is the unique identifier, cannot be traced back to the device it originated from.
	// client.zrem('emergencies', pushToken);
	client.geoadd('emergencies', longitude, latitude, pushToken);

	return res.status(200).json({
		success: true,
		message: 'Current location successfully cached'
	});
};
