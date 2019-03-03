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
	const { coordinates, deviceId } = req.body;
	const io: socketIO.Server = req.app.get('io');
	try {
		const emergency = new Emergency({ deviceId, coordinates });
		await emergency.save();
		await io.emit('emergency', emergency);
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
	const pushTokens: string[] | any = User.find().select('pushToken - _id');
	try {
		// const emergencies = await Emergency.find();
		const messages = [];
		for (let pushToken of pushTokens) {
			if (!expo.isExpoPushToken(pushToken)) {
				console.error(`Push token ${pushToken} is not a valid Expo push token`);
				continue;
			}
			messages.push({
				to: pushToken,
				sound: 'default',
				body: 'Someone near you is in trouble. Mind lending a helping hand?',
				data: { coordinates }
			});
		}

		let chunks = Expo.chunkPushNotifications(messages);
		let tickets = [];
		(async () => {
			for (let chunk of chunks) {
				try {
					const ticketChunk = await Expo.sendPushNotificationsAsync(chunk);
					tickets.push(...ticketChunk);
				} catch (error) {
					console.error(error);
				}
			}
		})();

		const receiptIds = [];
		tickets.forEach(ticket => ticket.id && receiptIds.push(ticket.id));

		let receiptIdChunks = Expo.chunkPushNotificationReceiptIds(receiptIds);
		await receiptIdChunks.forEach(async chunk => {
			try {
				const receipts: any = await Expo.getPushNotificationReceiptsAsync(
					chunk
				);
				receipts.forEach(receipt => {
					if (receipt.status === 'error') {
						console.error(
							`There was an error sending a notification: ${receipt.message}`
						);
						if (receipt.details && receipt.details.error) {
							console.error(`The error code is ${receipt.details.error}`);
						}
					}
				});
			} catch (error) {
				console.error(error);
			}
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.'
		});
	}
};
