import {
	FETCH_SAFE_SPOTS,
	FETCH_SAFE_SPOTS_SUCCESS,
	FETCH_SAFE_SPOTS_FAILURE,
	ADD_SAFE_SPOT_SUCCESS,
	ADD_SAFE_SPOT_FAILURE,
	DELETE_SAFE_SPOT_SUCCESS,
	DELETE_SAFE_SPOT_FAILURE,
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
				...action.payload
			};
		case FETCH_SAFE_SPOTS_FAILURE:
			return {
				...state,
				loading: false,
				...action.payload
			};
		case ADD_SAFE_SPOT_SUCCESS:
			return {
				...state,
				safeSpots: [...state.safeSpots, action.payload.spot]
			};
		case ADD_SAFE_SPOT_FAILURE:
			return { ...state, ...action.payload };
		case DELETE_SAFE_SPOT_SUCCESS:
			return {
				...state,
				safeSpots: state.safeSpots.filter(
					({ _id }) => _id !== action.payload.id
				)
			};
		case DELETE_SAFE_SPOT_FAILURE:
			return { ...state, ...action.payload };
		default:
			return state;
	}
};
