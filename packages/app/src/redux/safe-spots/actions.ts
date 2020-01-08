import {
	FETCH_SAFE_SPOTS_SUCCESS,
	FETCH_SAFE_SPOTS,
	FETCH_SAFE_SPOTS_FAILURE,
	DELETE_SAFE_SPOT,
	DELETE_SAFE_SPOT_FAILURE
} from './types';
import env from '../../../env';
import { AppThunk } from '../../../store';
import { getUserData } from '../../helpers/auth';

interface AddSafeSpotOptions {
	name: string;
	location: EmergencyCoordinates;
}

export const addSafeSpot = ({
	name,
	location
}: AddSafeSpotOptions): AppThunk => async dispatch => {
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

		dispatch({
			type: FETCH_SAFE_SPOTS_SUCCESS,
			payload: [spot]
		});
	} catch (error) {
		dispatch({
			type: FETCH_SAFE_SPOTS_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};

export const getSafeSpot = (): AppThunk => async dispatch => {
	try {
		dispatch({ type: FETCH_SAFE_SPOTS });

		const user = await getUserData();
		if (!user) return;

		const response = await fetch(
			`${env.apiUrl}safe-spots/get?userId=${user._id}}`
		);

		const { spots } = await response.json();
		dispatch({ type: FETCH_SAFE_SPOTS_SUCCESS, payload: { spots } });
	} catch (error) {
		dispatch({
			type: FETCH_SAFE_SPOTS_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};

export const deleteSafeSpot = (id: string): AppThunk => async dispatch => {
	try {
		const user = await getUserData();
		if (!user) return;

		await fetch(
			`${env.apiUrl}safe-spots/delete?userId=${user._id}&spotId=${id}`,
			{ method: 'DELETE' }
		);

		dispatch({ type: DELETE_SAFE_SPOT, payload: { id } });
	} catch (error) {
		dispatch({
			type: DELETE_SAFE_SPOT_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};
