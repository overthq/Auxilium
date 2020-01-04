import { AsyncStorage, Alert } from 'react-native';

interface User {
	_id: string;
	pushToken: string;
	createdAt: Date;
	updatedAt: Date;
}

export const checkAuthStatus = async () => {
	try {
		const user = await AsyncStorage.getItem('user');
		return !!user;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export const storeAuthData = (user: User) => {
	try {
		AsyncStorage.setItem('user', JSON.stringify(user));
	} catch (error) {
		Alert.alert(error.message);
	}
};
