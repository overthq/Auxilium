import {
	FETCH_LOCATION,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE
} from '../types/Location';

const initialState = {
	loading: false,
	coords: {
		longitude: 0,
		latitude: 0
	},
	emergencies: [{}],
	weatherData: {},
	errorMessage: ''
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case FETCH_LOCATION:
			return { ...state, loading: true };
		case FETCH_LOCATION_SUCCESS:
			return {
				...state,
				loading: false,
				coords: action.payload.coords,
				emergencies: action.payload.emergencies,
				weatherData: action.payload.weatherData
			};
		case FETCH_LOCATION_FAILURE:
			return {
				...state,
				loading: false,
				errorMessage: action.payload.errorMessage
			};
		default:
			return state;
	}
};
