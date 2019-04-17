import { Alert } from 'react-native';

const getAddressFromCoords = async ({ longitude, latitude }: Coordinates) => {
	try {
		const response = await fetch(
			`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoia29yZWRlMzYwIiwiYSI6ImNqZno1MGN2YjBhOTgyd2xlbWFhMGQ3dmwifQ.1AbAu_Ga4bu4iQCnOgBfog`
		);
		const { features } = await response.json();
		return features[2].place_name;
	} catch (error) {
		return Alert.alert(error.message);
	}
};

export default { getAddressFromCoords };
