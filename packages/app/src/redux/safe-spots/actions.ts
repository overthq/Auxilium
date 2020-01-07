import { addSafeSpot } from '../../api/SafeSpots';
import { FETCH_SAFE_SPOTS_SUCCESS } from './types';
import { AppThunk } from '../../../store';
import { Alert } from 'react-native';

interface AddSpot {
	name: string;
	location: EmergencyCoordinates;
}

export const add = ({
	name,
	location
}: AddSpot): AppThunk => async dispatch => {
	try {
		const spot = await addSafeSpot({ name, location });

		dispatch({
			type: FETCH_SAFE_SPOTS_SUCCESS,
			payload: [spot]
		});
	} catch (error) {
		Alert.alert(error.message);
	}
};
