import { Emergencies } from '../../api';
import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE
} from './types';

const fetchEmergencies = () => {
	return async (dispatch: any, getState: any): Promise<void> => {
		const {
			location: { coordinates }
		} = getState();

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

export default { fetchEmergencies };
