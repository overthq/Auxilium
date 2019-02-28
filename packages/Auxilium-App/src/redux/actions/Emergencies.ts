import haversine from 'haversine';
import { Firebase } from '../../config';
import {
	FETCH_EMERGENCIES,
	FETCH_EMERGENCIES_SUCCESS,
	FETCH_EMERGENCIES_FAILURE
} from '../types/Emergencies';

export default () => {
	return async (dispatch: any, getState: any) => {
		const {
			location: { coords }
		} = getState();
		dispatch({ type: FETCH_EMERGENCIES });
		try {
			await Firebase.firestore
				.collection('emergencies')
				.orderBy('timestamp', 'desc')
				.onSnapshot(async snapshot => {
					snapshot.forEach(document => {
						const l = document.data().location;
						if (haversine(coords, l) <= 1) {
							return dispatch({
								type: FETCH_EMERGENCIES_SUCCESS,
								payload: { emergency: document.data() }
							});
						}
					});
				});
		} catch (error) {
			console.log(errors);
			return dispatch({
				type: FETCH_EMERGENCIES_FAILURE,
				payload: { errorMessage: error.message }
			});
		}
	};
};
