import { Expo } from 'expo-server-sdk';
import fetch from 'node-fetch';
import { EmergencyType } from '../models';

const expo = new Expo();

export const sendNotification = async (
	pushToken: string,
	emergency: EmergencyType
) => {
	const response = await fetch('https://exp.host/--/api/v2/push/send', {
		method: 'POST',
		headers: {
			host: 'exp.host',
			Accept: 'application/json',
			'Accept-Encoding': 'gzip, deflate',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			to: pushToken,
			sound: 'default',
			body: 'There may be an emergency at/around your current location.',
			subtitle: `A user in this vicinity has requested help`,
			data: emergency
		})
	});
	const data = response.json();
	return data;
};

interface NotificationInput {
	pushToken: string;
	distance: number;
	longitude: number;
	latitude: number;
}

export const sendNotifications = async (inputs: NotificationInput[]) => {
	const messages = [];

	inputs.map(({ pushToken, distance, longitude, latitude }) => {
		if (!Expo.isExpoPushToken(pushToken)) {
			throw new Error(`Push token ${pushToken} is not a valid Expo push token`);
		}

		messages.push({
			to: pushToken,
			sound: 'default',
			body: `An emergency has been reported about ${distance}km from your current location`,
			data: { longitude, latitude }
		});
	});

	const chunks = expo.chunkPushNotifications(messages);
	const tickets = [];

	for (const chunk of chunks) {
		try {
			const ticketChunk = await expo.sendPushNotificationsAsync(chunk);
			tickets.push(...ticketChunk);
		} catch (error) {
			throw new Error(error.message);
		}
	}

	const receiptIds = [];
	for (const ticket of tickets) {
		if (ticket.id) receiptIds.push(ticket.id);
	}

	const receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
	for (const chunk of receiptIdChunks) {
		try {
			const receipts = await expo.getPushNotificationReceiptsAsync(chunk);

			Object.entries(receipts).map(([, receipt]) => {
				switch (receipt.status) {
					case 'ok':
						break;
					case 'error':
						console.error(
							`There was an error sending a notification: ${receipt.message}`
						);
						if (receipt.details.error) {
							console.error(`The error code is ${receipt.details.error}`);
						}
				}
			});
		} catch (error) {
			console.error(error);
		}
	}
};
