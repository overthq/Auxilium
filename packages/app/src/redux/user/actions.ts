import { Alert, AsyncStorage } from 'react-native';
import { AppThunk } from '../../../store';
import {
	AUTH_LOADING,
	AUTHENTICATE_FAILURE,
	AUTHENTICATE_SUCCESS,
	LOG_OUT
} from './types';
import { authenticate } from '../../api/Auth';

export const auth = (): AppThunk => async (dispatch, getState) => {
	const {
		user: { user: currentUser }
	} = getState();

	if (currentUser) {
		Alert.alert('You are currently authenticated.');
		return;
	}

	dispatch({ type: AUTH_LOADING });

	try {
		const user = await authenticate();

		dispatch({
			type: AUTHENTICATE_SUCCESS,
			payload: { user }
		});
	} catch (error) {
		dispatch({
			type: AUTHENTICATE_FAILURE,
			payload: { errorMessage: error.message }
		});
	}
};

export const logOut = (): AppThunk => async dispatch => {
	await AsyncStorage.clear();
	dispatch({ type: LOG_OUT });
};
