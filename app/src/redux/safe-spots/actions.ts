import {
	FETCH_SAFE_SPOTS_SUCCESS,
	FETCH_SAFE_SPOTS,
	FETCH_SAFE_SPOTS_FAILURE,
	ADD_SAFE_SPOT_SUCCESS,
	ADD_SAFE_SPOT_FAILURE,
	DELETE_SAFE_SPOT_SUCCESS,
	DELETE_SAFE_SPOT_FAILURE
} from './types';
import env from '../../../env';
import { AppThunk } from '../../../store';

interface AddSafeSpotOptions {
	name: string;
	location: EmergencyCoordinates;
}

export const addSafeSpot = ({
	name,
	location
}: AddSafeSpotOptions): AppThunk => async (dispatch, getState) => {
	const {
		user: { user }
	} = getState();

	try {
		const response = await fetch(`${env.apiUrl}safe-spots/add`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: user?._id,
				name,
				location
			})
		});

		const { spot } = await response.json();

		dispatch({
			type: ADD_SAFE_SPOT_SUCCESS,
			payload: { spot }
		});
	} catch (error) {
		dispatch({
			type: ADD_SAFE_SPOT_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};

export const getSafeSpots = (): AppThunk => async (dispatch, getState) => {
	const {
		user: { user }
	} = getState();
	dispatch({ type: FETCH_SAFE_SPOTS });

	try {
		const response = await fetch(
			`${env.apiUrl}safe-spots/get?userId=${user?._id}`
		);

		const { spots } = await response.json();
		dispatch({
			type: FETCH_SAFE_SPOTS_SUCCESS,
			payload: { safeSpots: spots }
		});
	} catch (error) {
		dispatch({
			type: FETCH_SAFE_SPOTS_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};

export const deleteSafeSpot = (id: string): AppThunk => async (
	dispatch,
	getState
) => {
	const {
		user: { user }
	} = getState();
	try {
		await fetch(
			`${env.apiUrl}safe-spots/delete?userId=${user?._id}&spotId=${id}`,
			{ method: 'DELETE' }
		);

		dispatch({
			type: DELETE_SAFE_SPOT_SUCCESS,
			payload: { id }
		});
	} catch (error) {
		dispatch({
			type: DELETE_SAFE_SPOT_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};
