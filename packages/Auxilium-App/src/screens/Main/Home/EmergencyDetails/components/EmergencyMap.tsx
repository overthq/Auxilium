import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { MapView } from 'expo';
import { MapMarker } from '../../Overview/components';
import { LocationHelpers } from '../../../../../helpers';
import mapStyle from './mapStyle';

const { width, height } = Dimensions.get('window');

interface IEmergencyMapProps {
	coordinates: Coordinates;
	pageDetails: Emergency;
}

const EmergencyMap = (props: IEmergencyMapProps) => {
	const [route, setRoute] = React.useState<Coordinates[]>([]);
	const { coordinates: fromCoords, pageDetails } = props;
	const {
		location: {
			coordinates: [longitude, latitude]
		}
	} = pageDetails;

	const lonDelta = Math.abs(fromCoords.longitude - longitude);
	const latDelta = Math.abs(fromCoords.latitude - latitude);
	const longitudeDelta = lonDelta >= 0.00353 ? lonDelta : 0.00353;
	const latitudeDelta = latDelta >= 0.00568 ? latDelta : 0.00568;
	const centerLongitude = (fromCoords.longitude + longitude) / 2;
	const centerLatitude = (fromCoords.latitude + latitude) / 2;

	const from = fromCoords;
	const to = { longitude, latitude };

	React.useEffect(() => {
		const fetchRoute = async () => {
			const currentRoute =
				(await LocationHelpers.getNavigationRoute(from, to)) || [];
			setRoute(currentRoute);
		};
		fetchRoute();
	}, []);

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
		height: height * 0.7
	}
});

export default EmergencyMap;
