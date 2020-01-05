import { RequestHandler } from 'express';
import { Emergency, User } from '../models';
import { sendNotification } from '../helpers/sendNotification';
import { findNearbyEmergencies } from '../helpers/emergencies';

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
	const { userId, description, coordinates } = req.body;
	try {
		const emergency = await Emergency.create({
			user: userId,
			description,
			location: {
				type: 'Point',
				coordinates
			}
		});

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

export const backgroundNotifications: RequestHandler = async (req, res) => {
	const { longitude, latitude, pushToken } = req.query;

	try {
		const sender = await User.findOne({ pushToken });
		if (!sender) throw new Error('False alarm!');
		const emergencies = await findNearbyEmergencies(longitude, latitude);
		emergencies.forEach(async emergency => {
			if (
				sender.pushToken !== emergency.user.pushToken &&
				!emergency.recepients.includes(pushToken)
				// Another useful condtion is to make sure that the emergency is still recent
			) {
				await sendNotification(pushToken, emergency);
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
