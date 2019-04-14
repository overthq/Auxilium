import { Alert } from 'react-native';
import { Constants } from 'expo';
import env from '../../env';
import { AuthHelpers } from '../helpers';

const getNearbyEmergencies = async ({
	longitude,
	latitude
}: Coordinates): Promise<Emergency[] | void> => {
	try {
		const response = await fetch(
			`${
				env.apiUrl
			}emergencies/get?longitude=${longitude}&latitude=${latitude}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { emergencies } = await response.json();
		return emergencies;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

const getUserHistory = async () => {
	try {
		const response = await fetch(
			`${env.apiUrl}emergencies/history?deviceId=${Constants.deviceId}`,
			{
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json'
				}
			}
		);
		const { emergencies }: { emergencies: Emergency[] } = await response.json();
		return emergencies;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

const managePushNotifications = async ({
	longitude,
	latitude
}: Coordinates) => {
	try {
		const { pushToken } = await AuthHelpers.getAuthData();
		await fetch(
			`${
				env.apiUrl
			}emergencies/notifications?longitude=${longitude}&latitude=${latitude}&pushToken=${pushToken}`
		);
	} catch (error) {
		Alert.alert(error.message);
	}
};

export default {
	getNearbyEmergencies,
	getUserHistory,
	managePushNotifications
};
