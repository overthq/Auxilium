/* eslint-disable-next-line import/no-unresolved */
import io from 'socket.io-client';
import haversine from 'haversine';
import env from '../../../env';
import { Emergencies } from '../../api';
import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE
} from './types';

const socket = io(env.apiUrl, {
	jsonp: false,
	transports: ['websocket']
});

const fetchEmergencies = () => {
	return async (dispatch: any, getState: any): Promise<void> => {
		const {
			location: { coordinates }
		} = getState();

		socket.on('emergency', (emergency: Emergency) => {
			const distance = haversine(coordinates, {
				longitude: emergency.location.coordinates[0],
				latitude: emergency.location.coordinates[1]
			});
			if (Math.round(distance) <= 1) {
				dispatch({
					type: FETCH_EMERGENCIES_SUCCESS,
					payload: { emergencies: [emergency] }
				});
			}
		});

		dispatch({ type: FETCH_EMERGENCIES });
		try {
			const emergencies =
				(await Emergencies.getNearbyEmergencies(coordinates)) || [];

			return dispatch({
				type: FETCH_EMERGENCIES_SUCCESS,
				payload: { emergencies }
			});
		} catch (error) {
			return dispatch({
				type: FETCH_EMERGENCIES_FAILURE,
				errorMessage: error.message
			});
		}
	};
};

export default { fetchEmergencies, socket };
