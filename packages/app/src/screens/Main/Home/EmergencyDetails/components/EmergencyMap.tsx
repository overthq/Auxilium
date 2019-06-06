import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import MapView from 'react-native-maps';
import { MapMarker } from '../../Overview/components';
import { LocationHelpers } from '../../../../../helpers';
import mapStyle from './mapStyle';

const { width, height } = Dimensions.get('window');

interface EmergencyMapProps {
	coordinates: Coordinates;
	pageDetails: Emergency;
}

interface EmergencyMapState {
	route: Coordinates[];
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
	const { coordinates: fromCoords, pageDetails } = props;
	const {
		location: {
			coordinates: [longitude, latitude]
		}
	} = pageDetails;
	const [state, setState] = React.useReducer(
		(p, n) => ({ ...p, ...n }),
		initialState
	);

	React.useEffect(() => {
		preload();
		return () => setState(null);
	}, []);

	const preload = async () => {
		const lonDelta = Math.abs(fromCoords.longitude - longitude);
		const latDelta = Math.abs(fromCoords.latitude - latitude);
		const longitudeDelta = lonDelta >= 0.00353 ? lonDelta : 0.00353;
		const latitudeDelta = latDelta >= 0.00568 ? latDelta : 0.00568;
		const centerLongitude = (fromCoords.longitude + longitude) / 2;
		const centerLatitude = (fromCoords.latitude + latitude) / 2;

		await setState({
			longitudeDelta,
			latitudeDelta,
			centerLongitude,
			centerLatitude
		});

		const from = fromCoords;
		const to = { longitude, latitude };
		const currentRoute =
			(await LocationHelpers.getNavigationRoute(from, to)) || [];
		setState({ route: currentRoute });
	};

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
			<MapView.Marker coordinate={{ longitude, latitude }}>
				<MapMarker size={20} borderStroke={3} />
			</MapView.Marker>
			<MapView.Polyline
				coordinates={route}
				strokeColor='#FF8282'
				strokeWidth={3}
			/>
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
