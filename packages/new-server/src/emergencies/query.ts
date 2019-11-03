import { User, Emergency } from '../models';
import { findNearbyEmergencies } from './helpers';

const emergenciesQuery = {
	nearbyEmergencies: async (_, { longitude, latitude }) => {
		try {
			const emergencies = await findNearbyEmergencies(longitude, latitude);
			return emergencies;
		} catch (error) {
			throw error;
		}
	},
	userEmergencies: async (_, { deviceId }) => {
		try {
			const user = await User.findOne({ deviceId });
			if (!user) {
				throw new Error(`No user found with the deviceId: ${deviceId}`);
			}
			const emergencies = await Emergency.find({ deviceId });
			return emergencies;
		} catch (error) {
			throw error;
		}
	}
};

export default emergenciesQuery;
