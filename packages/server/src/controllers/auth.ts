import { RequestHandler } from 'express';
import { User } from '../models';

export const auth: RequestHandler = async (req, res) => {
	const { deviceId, pushToken } = req.body;
	if (!deviceId || !pushToken) {
		return res.status(400).json({
			success: false,
			message: 'Please use this from a device ;)'
		});
	}
	try {
		let user = await User.findOne({ deviceId });
		if (!user) {
			const newUser = await User.create({ deviceId, pushToken });
			user = newUser;
		}
		return res.status(200).json({
			success: true,
			message: 'User successfully verified',
			user // Add access token and JWT info to limit who can make further requests to the API.
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error occured. Please try again later.',
			error
		});
	}
};
