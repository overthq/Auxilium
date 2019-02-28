import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE
} from '../types/Emergencies';

const initialState: {
	loading: boolean;
	emergencies: any[];
	errorMessage: string;
} = {
	loading: false,
	emergencies: [],
	errorMessage: ''
};

export default (state = initialState, action: any) => {
	switch (action.type) {
		case FETCH_EMERGENCIES:
			return { ...state, loading: true };
		case FETCH_EMERGENCIES_SUCCESS:
			const index = state.emergencies.findIndex(
				emergency => emergency.location == action.payload.emergency.location
			);
			if (index === -1)
				return {
					loading: false,
					emergencies: [...state.emergencies, action.payload.emergency]
				};
			return state;
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
