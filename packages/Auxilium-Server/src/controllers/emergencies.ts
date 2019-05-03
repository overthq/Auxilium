import { Request, Response } from 'express';
import * as haversine from 'haversine';
import { Emergency, User } from '../models';
import { sendNotification } from '../helpers';

export const getNearbyEmergencies = async (req: Request, res: Response) => {
	const { longitude, latitude }: { [key: string]: string } = req.query;
	try {
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

export const getUserEmergencies = async (req: Request, res: Response) => {
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

export const backgroundNotifications = async (req: Request, res: Response) => {
	const {
		longitude: lon,
		latitude: lat,
		pushToken
	}: { [key: string]: string } = req.query;
	try {
		const emergencies = await Emergency.find({
			location: {
				$near: {
					$maxDistance: 1000,
					$geometry: {
						type: 'Point',
						coordinates: [Number(lon), Number(lat)]
					}
				}
			}
		}).find();
		emergencies.forEach(async (emergency: any) => {
			const coordinates = emergency.location;
			const [longitude, latitude] = coordinates;
			const distance = haversine(
				{ longitude: Number(lon), latitude: Number(lat) },
				{ longitude, latitude }
			);
			if (distance <= 1 && !emergency.recepients.includes(pushToken)) {
				const data = await sendNotification(pushToken);
				await emergency.recepients.push(pushToken);
				await emergency.save();
				res.status(200).json({
					success: true,
					message: 'Found emergency in your area',
					data
				});
			}
			res.status(200).json({
				success: true,
				message: 'Good news, No emergency found in your area.'
			});
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.'
		});
	}
};
