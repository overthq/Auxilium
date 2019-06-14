import {
	FETCH_LOCATION,
	FETCH_LOCATION_SUCCESS,
	FETCH_LOCATION_FAILURE
} from './types';
import { Alert } from 'react-native';

const initialState = {
	loading: false,
	coordinates: {
		longitude: 0,
		latitude: 0
	},
	place: '',
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
				coordinates: action.payload.coordinates,
				place: action.payload.place || state.place
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
