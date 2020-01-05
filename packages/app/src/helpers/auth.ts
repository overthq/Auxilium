import { AsyncStorage, Alert } from 'react-native';

interface User {
	_id: string;
	pushToken: string;
	createdAt: Date;
	updatedAt: Date;
}

export const getUserData = async () => {
	try {
		const user = await AsyncStorage.getItem('user');
		if (!user) {
			throw new Error('You must be authenticated to use this feature.');
		}
		return JSON.parse(user) as User;
	} catch (error) {
		Alert.alert(error.message);
	}
};

export const storeUserData = (user: User) => {
	try {
		AsyncStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		Alert.alert(error.message);
	}
};
