import { Emergency } from '../models';
import { getAddress } from './helpers';

const emergencyMutation = {
	reportEmergency: async (_, { deviceId, description, coordinates }) => {
		const [longitude, latitude] = coordinates;
		try {
			const address = await getAddress({ longitude, latitude });
			const emergency = await Emergency.create({
				deviceId,
				description,
				location: { type: 'Point', coordinates },
				address
			});
			return emergency;
		} catch (error) {
			throw error;
		}
	}
};

export default emergencyMutation;
