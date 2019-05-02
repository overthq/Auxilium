import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE
} from './types';

const initialState = {
	loading: false,
	emergencies: [],
	errorMessage: ''
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case FETCH_EMERGENCIES:
			return { ...state, loading: true };
		case FETCH_EMERGENCIES_SUCCESS:
			return {
				...state,
				loading: false,
				emergencies: [...state.emergencies, ...action.payload.emergencies]
			};
		case FETCH_EMERGENCIES_FAILURE:
			return {
				...state,
				loading: false,
				errorMessage: action.payload.errorMessage
			};
		default:
			return state;
	}
};
