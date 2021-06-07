import {
	UserState,
	UserActionTypes,
	LOG_OUT,
	AUTH_LOADING,
	AUTHENTICATE_SUCCESS,
	AUTHENTICATE_FAILURE
} from './types';

const initialState: UserState = {
	loading: false,
	user: null,
	errorMessage: ''
};

const userReducer = (
	state = initialState,
	action: UserActionTypes
): UserState => {
	switch (action.type) {
		case AUTH_LOADING:
			return { ...state, loading: true };
		case AUTHENTICATE_SUCCESS:
			return { ...state, loading: false, ...action.payload };
		case AUTHENTICATE_FAILURE:
			return { ...state, loading: false, ...action.payload };
		case LOG_OUT:
			return initialState;
		default:
			return state;
	}
};

export default userReducer;
