import { Alert } from 'react-native';
import env from '../../env';
import { getUserData } from '../helpers/auth';

interface AddSafeSpotOptions {
	name: string;
	location: EmergencyCoordinates;
}

export const addSafeSpot = async ({ name, location }: AddSafeSpotOptions) => {
	try {
		const user = await getUserData();
		if (!user) return;

		const response = await fetch(`${env.apiUrl}safe-spots/add`, {
			method: 'POST',
			body: JSON.stringify({
				userId: user._id,
				name,
				location
			})
		});

		const { spot } = await response.json();
		return spot;
	} catch (error) {
		Alert.alert(error.message);
	}
};

export const getSafeSpots = async () => {
	try {
		const user = await getUserData();
		if (!user) return;

		const response = await fetch(
			`${env.apiUrl}safe-spots/get?userId=${user._id}}`
		);

		const { spots } = await response.json();
		return spots;
	} catch (error) {
		Alert.alert(error.message);
	}
};

export const deleteSafeSpot = async (id: string) => {
	try {
		const user = await getUserData();
		if (!user) return;

		const response = await fetch(
			`${env.apiUrl}safe-spots/delete?userId=${user._id}&spotId=${id}`,
			{
				method: 'DELETE'
			}
		);

		const data = await response.json();
		return data;
	} catch (error) {
		Alert.alert(error.message);
	}
};
