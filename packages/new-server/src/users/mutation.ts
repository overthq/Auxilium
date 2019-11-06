import { User } from '../models';

const userMutation = {
	authenticate: async (_, { input }) => {
		const { deviceId, pushToken } = input;
		if (!deviceId || !pushToken) {
			throw new Error('Please use this from a device ;)');
		}
		try {
			let user = await User.findOne({ deviceId });
			if (!user) {
				const newUser = await User.create({ deviceId, pushToken });
				user = newUser;
			}
			return user;
		} catch (error) {
			throw error;
		}
	}
};

export default userMutation;
