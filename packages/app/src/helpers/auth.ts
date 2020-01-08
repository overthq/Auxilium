import { AsyncStorage } from 'react-native';

interface User {
	_id: string;
	pushToken: string;
	createdAt: Date;
	updatedAt: Date;
}

export const getUserData = async () => {
	const user = await AsyncStorage.getItem('user');
	if (!user) {
		throw new Error('You must be authenticated to use this feature.');
	}
	return JSON.parse(user) as User;
};

export const storeUserData = (user: User) => {
	return AsyncStorage.setItem('user', JSON.stringify(user));
};
