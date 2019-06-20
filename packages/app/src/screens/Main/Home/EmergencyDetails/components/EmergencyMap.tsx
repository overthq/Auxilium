import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { MapMarker } from '../../Overview/components';
import { Location } from '../../../../../api';
import mapStyle from './mapStyle';

const { width, height } = Dimensions.get('window');

interface EmergencyMapProps {
	coordinates: EmergencyCoordinates;
	longitude: number;
	latitude: number;
}

interface EmergencyMapState {
	route: EmergencyCoordinates[];
	longitudeDelta: number;
	latitudeDelta: number;
	centerLongitude: number;
	centerLatitude: number;
}

const initialState: EmergencyMapState = {
	route: [],
	longitudeDelta: 0,
	latitudeDelta: 0,
	centerLongitude: 0,
	centerLatitude: 0
};

const EmergencyMap = (props: EmergencyMapProps) => {
	const { coordinates: from, longitude, latitude } = props;

	const [state, setState] = React.useReducer(
		(p, n) => ({ ...p, ...n }),
		initialState
	);

	React.useEffect(() => {
		preload();
		return () => setState(null);
	}, []);

	const preload = React.useCallback(async () => {
		const lonDelta = Math.abs(from.longitude - longitude);
		const latDelta = Math.abs(from.latitude - latitude);
		const longitudeDelta = lonDelta >= 0.00353 ? lonDelta : 0.00353;
		const latitudeDelta = latDelta >= 0.00568 ? latDelta : 0.00568;
		const centerLongitude = (from.longitude + longitude) / 2;
		const centerLatitude = (from.latitude + latitude) / 2;

		await setState({
			longitudeDelta,
			latitudeDelta,
			centerLongitude,
			centerLatitude
		});

		const to = { longitude, latitude };
		const currentRoute = (await Location.getRoute(from, to)) || [];
		setState({ route: currentRoute });
	}, [longitude, latitude]);

	const {
		route,
		longitudeDelta,
		latitudeDelta,
		centerLongitude,
		centerLatitude
	} = state;

	return (
		<MapView
			style={styles.map}
			provider='google'
			customMapStyle={mapStyle}
			initialRegion={{
				longitude: centerLongitude,
				latitude: centerLatitude,
				longitudeDelta,
				latitudeDelta
			}}
			showsIndoors
			showsBuildings
			pitchEnabled={false}
			rotateEnabled={false}
			scrollEnabled={false}
			zoomEnabled={false}
		>
			<Marker coordinate={{ longitude, latitude }}>
				<MapMarker size={20} borderStroke={3} />
			</Marker>
			<Polyline coordinates={route} strokeColor='#FF8282' strokeWidth={3} />
		</MapView>
	);
};

const styles = StyleSheet.create({
	map: {
		width,
		height: height * 0.8
	}
});

export default EmergencyMap;
