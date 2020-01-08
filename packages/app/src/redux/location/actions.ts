import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { Alert } from 'react-native';
import {
	FETCH_LOCATION,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE
} from './types';
import { getAddress } from '../../api/Location';
import { AppThunk } from '../../../store';

export const locate = (): AppThunk => async dispatch => {
	dispatch({ type: FETCH_LOCATION });
	try {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			return Alert.alert('We require location permissions to use this app');
		}
		const {
			coords: { latitude, longitude }
		} = await Location.getCurrentPositionAsync({ accuracy: 1 });

		dispatch({
			type: FETCH_LOCATION_SUCCESS,
			payload: { coordinates: { latitude, longitude } }
		});
	} catch (error) {
		dispatch({
			type: FETCH_LOCATION_FAILURE,
			payload: { errorMessage: error }
		});
	}
};
