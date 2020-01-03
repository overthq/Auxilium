import { Emergency } from '../models';

export const findNearbyEmergencies = async (
	longitude: number | string,
	latitude: number | string
) => {
	const emergencies = await Emergency.find({
		location: {
			$near: {
				$maxDistance: 1000,
				$geometry: {
					type: 'Point',
					coordinates: [Number(longitude), Number(latitude)]
				}
			}
		}
	})
		.find()
		.populate('user');
	return emergencies;
};
