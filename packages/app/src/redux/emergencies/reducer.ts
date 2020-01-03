import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE,
	EmergenciesAction,
	EmergenciesState
} from './types';

const initialState: EmergenciesState = {
	loading: false,
	emergencies: [],
	errorMessage: ''
};

export default (state = initialState, action: EmergenciesAction) => {
	switch (action.type) {
		case FETCH_EMERGENCIES:
			return { ...state, loading: true };
		case FETCH_EMERGENCIES_SUCCESS:
			return {
				...state,
				loading: false,
				...action.payload
			};
		case FETCH_EMERGENCIES_FAILURE:
			return {
				...state,
				loading: false,
				...action.payload
			};
		default:
			return state;
	}
};
