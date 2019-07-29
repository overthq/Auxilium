import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import {
	FETCH_LOCATION,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE
} from './types';
import { Location as LocationAPI } from '../../api';

const locate = (addressRefresh: boolean = true) => {
	return async (dispatch: any): Promise<void> => {
		dispatch({ type: FETCH_LOCATION });
		try {
			const { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status !== 'granted') {
				return Alert.alert('We require location permissions to use this app');
			}
			const {
				coords: { latitude, longitude }
			} = await Location.getCurrentPositionAsync({ accuracy: 1 });

			let place;

			if (addressRefresh) {
				place = await LocationAPI.getAddress({
					latitude,
					longitude
				});
			}

			return dispatch({
				type: FETCH_LOCATION_SUCCESS,
				payload: {
					coordinates: { latitude, longitude },
					place
				}
			});
		} catch (error) {
			return dispatch({
				type: FETCH_LOCATION_FAILURE,
				payload: { errorMessage: error }
			});
		}
	};
};

export default { locate };
