import { RequestHandler } from 'express-serve-static-core';
import { SafeSpot, User } from '../models';

export const addSafeSpot: RequestHandler = async (req, res) => {
	const { userId, name, location } = req.body;
	try {
		const user = await User.findById(userId);
		if (!user) {
			return res.status(404).json({
				success: false,
				message: 'The specified user does not exist'
			});
		}

		const safeSpots = await SafeSpot.find({
			user: user.id,
			location: {
				$near: {
					$maxDistance: 1000,
					$geometry: {
						type: 'Point',
						coordinates: [Number(location.longitude), Number(location.latitude)]
					}
				}
			}
		}).find();

		if (safeSpots.length > 0) {
			return res.status(400).json({
				success: false,
				message: 'You already have a safe-spot set in this vicinity.'
			});
		}

		const spot = await SafeSpot.create({
			user: userId,
			name,
			location: {
				type: 'Point',
				coordinates: [location.longitude, location.latitude]
			}
		});

		return res.status(200).json({
			success: true,
			spot
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

export const deleteSafeSpot: RequestHandler = async (req, res) => {
	const { userId, spotId } = req.query;

	try {
		const spot = await SafeSpot.findOne({ _id: spotId, user: userId });

		if (!spot) {
			return res.status(404).json({
				success: false,
				message: 'The specified spot does not exist'
			});
		}

		await spot.remove();

		return res.status(200).json({
			success: true,
			message: `The spot ${spot.name} has successfully been deleted.`
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message
		});
	}
};

export const getSafeSpots: RequestHandler = async (req, res) => {
	const { userId } = req.query;
	try {
		const spots = await SafeSpot.find({ user: userId });
		return res.status(200).json({
			success: true,
			spots
		});
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: error.message
		});
	}
};
