import { AsyncStorage, Alert } from 'react-native';

const checkAuthStatus = async () => {
	try {
		const [deviceId, pushToken] = await AsyncStorage.multiGet([
			'deviceId',
			'pushToken'
		]);
		return deviceId[1] && pushToken[1];
	} catch (error) {
		return Alert.alert(error.message);
	}
};

const storeAuthData = async (deviceId: string, pushToken: string) => {
	try {
		await AsyncStorage.multiSet([
			['deviceId', deviceId],
			['pushToken', pushToken]
		]);
	} catch (error) {
		Alert.alert(error.message);
	}
};

const getAuthData = async (): Promise<any> => {
	try {
		const [deviceId, pushToken] = await AsyncStorage.multiGet([
			'deviceId',
			'pushToken'
		]);
		return { deviceId: deviceId[1], pushToken: pushToken[1] };
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { checkAuthStatus, storeAuthData, getAuthData };
