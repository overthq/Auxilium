import { RequestHandler } from 'express';
import { Emergency, User } from '../models';
import {
	sendNotification,
	getAddress,
	findNearbyEmergencies
} from '../helpers';

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

export const createEmergency: RequestHandler = async (req, res) => {
	const { deviceId, description, coordinates } = req.body;
	const [longitude, latitude] = coordinates;
	try {
		const address = await getAddress({ longitude, latitude });
		const emergency = new Emergency({
			deviceId,
			description,
			location: {
				type: 'Point',
				coordinates
			},
			address
		});
		await emergency.save();
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
	const { deviceId } = req.query;
	try {
		const user = await User.findOne({ deviceId });
		if (!user) {
			return res.status(404).json({
				success: false,
				message: `No user found with the deviceId: ${deviceId}`
			});
		}
		const emergencies = await Emergency.find({ deviceId });
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

export const backgroundNotifications: RequestHandler = async (req, res) => {
	const {
		longitude: lon,
		latitude: lat,
		pushToken
	}: { [key: string]: string } = req.query;
	try {
		const sender = await User.findOne({ pushToken });
		if (!sender) throw new Error('False alarm!');
		const emergencies = await findNearbyEmergencies(lon, lat);
		emergencies.forEach(async emergency => {
			const { coordinates } = emergency.location;
			const [longitude, latitude] = coordinates;
			if (
				sender.deviceId !== emergency.deviceId &&
				!emergency.recepients.includes(pushToken)
			) {
				const address = await getAddress({ longitude, latitude });
				await sendNotification(pushToken, address, emergency);
				emergency.recepients.push(pushToken);
				await emergency.save();
			}
			return res.status(200).json({
				success: true,
				message: 'Successfully handled nearby emergencies'
			});
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.'
		});
	}
};
