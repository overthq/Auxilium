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
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				userId: user._id,
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

// In the future, I might have to overfetch this data, and get the list of emergencies in the safe spots as well.
// The main concern for overfetching here is the fact that it will make the Overview screen take longer to load.
// I have to make sure that data loading on the Overview page is reduced to a bare minimum
// This also means adding loading states to most sections that rely on data from external sources.
// Nearby emergencies should also load AFTER the initial render.

export const getSafeSpots = (): AppThunk => async dispatch => {
	try {
		dispatch({ type: FETCH_SAFE_SPOTS });

		const user = await getUserData();
		if (!user) return;

		const response = await fetch(
			`${env.apiUrl}safe-spots/get?userId=${user._id}`
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

export const deleteSafeSpot = (id: string): AppThunk => async dispatch => {
	try {
		const user = await getUserData();
		if (!user) return;

		await fetch(
			`${env.apiUrl}safe-spots/delete?userId=${user._id}&spotId=${id}`,
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
