import { Request, Response } from 'express';
import { Emergency } from '../models';

export const createEmergency = (req: Request, res: Response) => {
	const { location: { longitude, latitude }, user } = req.body;
	try {
		
	} catch (error) {
		return res.status(500).json({
			success: false,
			message: 'An error has occured. Please try again later.'
		})
	}
};