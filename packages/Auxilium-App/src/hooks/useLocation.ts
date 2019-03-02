import { useEffect, useState } from 'react';
import Geolocation from 'react-native-geolocation-service';

const initialState = {
	timeStamp: null,
	coords: {
		accuracy: null,
		altitude: null,
		altitudeAccuracy: null,
		heading: null,
		latitude: null,
		longitude: null,
		speed: null
	}
};

export default (positionOptions = {}) => {
	const [position, setPosition] = useState(initialState);

	useEffect(() => {
		Geolocation.getCurrentPosition(success, failure);
	}, []);

	useEffect(() => {
		const listener = Geolocation.watchPosition(
			success,
			failure,
			positionOptions
		);

		return () => Geolocation.clearWatch(listener);
	}, []);

	function success(data) {
		setPosition(data);
	}

	function failure(err) {
		console.log('error setting coordinates: ', err);
	}

	function setRNConfiguration(config) {
		Geolocation.setRNConfiguration(config);
	}

	function stopObserving() {
		Geolocation.stopObserving();
	}

	return [position, stopObserving, setRNConfiguration];
};
