import { Geolocation } from 'react-native';
import { Location, Permissions } from 'expo';
import {
	FETCH_LOCATION,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE
} from '../types/Location';

const DARK_SKY_API_KEY = 'fe761a4f14cbc7bada5700fc01f45fa9';

export default () => {
	return async (dispatch: any): Promise<void> => {
		dispatch({ type: FETCH_LOCATION });
		try {
			const { coords } = Geolocation.getCurrentPosition();
			const { status } = await Permissions.askAsync(Permissions.LOCATION);
			if (status === 'granted') {
				const {
					coords: { latitude, longitude }
				} = await Location.getCurrentPositionAsync({
					enableHighAccuracy: true
				});
				const response = await fetch(
					`https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${latitude},${longitude}?exclude=[minutely,hourly,daily,alert,flags]`
				);
				const weatherData = await response.json();
				return dispatch({
					type: FETCH_LOCATION_SUCCESS,
					payload: {
						coords: { latitude, longitude },
						weatherData
					}
				});
			}
			return dispatch({
				type: FETCH_LOCATION_FAILURE,
				payload: { errorMessage: 'Location permission not granted.' }
			});
		} catch (error) {
			return dispatch({
				type: FETCH_LOCATION_FAILURE,
				payload: { errorMessage: error }
			});
		}
	};
};
