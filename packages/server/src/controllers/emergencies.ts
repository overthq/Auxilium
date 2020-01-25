import util from 'util';
import { Emergency, User } from '../models';
import { findNearbyEmergencies } from '../helpers/emergencies';
import { sendNotifications } from '../helpers/notifications';
import { RequestHandler } from 'express';
import client from '../config/redis';

const georadius = util.promisify(client.georadius).bind(client);

export const getNearbyEmergencies: RequestHandler = async (req, res) => {
	const { longitude, latitude }: { [key: string]: string } = req.query;
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

		return res.status(201).json({
			success: true,
			message: 'Emergency successfully created.',
			emergency
		});
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
	// client.zrem('emergencies', pushToken);
	client.geoadd('emergencies', longitude, latitude, pushToken);

	return res.status(200).json({
		success: true,
		message: 'Current location successfully added to cache'
	});
};
