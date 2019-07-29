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
		const user = await User.findOne({ deviceId });
		if (!user) {
			const newUser = new User({ deviceId, pushToken });
			await newUser.save();
		}
		return res.status(200).json({
			success: true,
			message: 'User successfully verified'
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error occured. Please try again later.',
			error
		});
	}
};
