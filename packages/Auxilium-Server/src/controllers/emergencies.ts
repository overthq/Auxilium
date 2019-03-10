import * as socketIO from 'socket.io';
import { Request, Response } from 'express';
import expo from 'expo-server-sdk';
import { Emergency, User } from '../models';

const Expo = new expo();

interface Coordinates {
	longitude: number;
	latitude: number;
}

export const createEmergency = async (req: Request, res: Response) => {
	const {
		coordinates,
		deviceId
	}: { coordinates: Coordinates; deviceId: string } = req.body;
	// const io: socketIO.Server = req.app.get('io');
	try {
		const emergency = new Emergency({
			deviceId,
			location: {
				type: 'Point',
				coordinates: [coordinates.longitude, coordinates.latitude]
			}
		});
		await emergency.save();
		return res.status(200).json({
			success: true,
			message: 'Emergency logged'
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.'
		});
	}
};

export const getNearbyEmergencies = async (req: Request, res: Response) => {
	const { coordinates }: { coordinates: Coordinates } = req.body;
	const io: socketIO.Server = req.app.get('io');
	try {
		// const pushTokens: string[] | any = await User.find().select(
		// 	'pushToken - _id'
		// );
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
		emergencies && io.emit('emergencies', emergencies);
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
