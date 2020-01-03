import { Emergencies } from '../../api';
import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE
} from './types';
import { AppThunk } from '../../../store';

const fetchEmergencies = (): AppThunk => async (dispatch, getState) => {
	const {
		location: { coordinates }
	} = getState();

	dispatch({ type: FETCH_EMERGENCIES });

	try {
		const emergencies = await Emergencies.getNearbyEmergencies(coordinates);

		dispatch({
			type: FETCH_EMERGENCIES_SUCCESS,
			payload: { emergencies }
		});
	} catch (error) {
		dispatch({
			type: FETCH_EMERGENCIES_FAILURE,
			payload: {
				errorMessage: error.message
			}
		});
	}
};

export default { fetchEmergencies };
