import { Request, Response } from 'express';
import { Emergency, User } from '../models';

interface Coordinates {
	longitude: number;
	latitude: number;
}

export const getNearbyEmergencies = async (req: Request, res: Response) => {
	const { coordinates }: { coordinates: Coordinates } = req.body;
	try {
		// const pushTokens: string[] | any = await User.find().select(
		// 	'pushToken - _id'
		// );
		// Use the above *only* when the app is in the background.
		const emergencies = await Emergency.find({
			location: {
				$near: {
					$maxDistance: 1000,
					$geometry: {
						type: 'Point',
						coordinates: [coordinates.longitude, coordinates.latitude]
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
