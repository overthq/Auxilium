import { AsyncStorage, Alert } from 'react-native';

export const checkAuthStatus = async () => {
	try {
		const pushToken = await AsyncStorage.getItem('pushToken');
		return !!pushToken;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export const storeAuthData = async (pushToken: string) => {
	try {
		await AsyncStorage.setItem('pushToken', pushToken);
	} catch (error) {
		Alert.alert(error.message);
	}
};
