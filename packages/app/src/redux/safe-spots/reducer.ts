import {
	FETCH_SAFE_SPOTS,
	FETCH_SAFE_SPOTS_SUCCESS,
	FETCH_SAFE_SPOTS_FAILURE,
	SafeSpotsState,
	SafeSpotsActionTypes
} from './types';

const initialState: SafeSpotsState = {
	loading: false,
	safeSpots: [],
	errorMessage: ''
};

export default (state = initialState, action: SafeSpotsActionTypes) => {
	switch (action.type) {
		case FETCH_SAFE_SPOTS:
			return { ...state, loading: true };
		case FETCH_SAFE_SPOTS_SUCCESS:
			return {
				...state,
				loading: false,
				safeSpots: [...state.safeSpots, ...action.payload.spots]
			};
		case FETCH_SAFE_SPOTS_FAILURE:
			return {
				...state,
				loading: false,
				...action.payload
			};
		default:
			return state;
	}
};
