import {
	FETCH_LOCATION,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE,
	LocationActionTypes,
	LocationState
} from './types';

const initialState: LocationState = {
	loading: false,
	coordinates: { longitude: 0, latitude: 0 },
	errorMessage: ''
};

export default (state = initialState, action: LocationActionTypes) => {
	switch (action.type) {
		case FETCH_LOCATION:
			return { ...state, loading: true };
		case FETCH_LOCATION_SUCCESS:
			return {
				...state,
				loading: false,
				...action.payload
			};
		case FETCH_LOCATION_FAILURE:
			return {
				...state,
				loading: false,
				...action.payload
			};
		default:
			return state;
	}
};
