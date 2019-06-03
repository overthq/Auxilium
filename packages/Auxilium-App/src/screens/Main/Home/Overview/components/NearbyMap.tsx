import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MapView, Region } from 'expo';
import mapStyle from '../mapStyle';
import MapMarker from './MapMarker';

const { width, height } = Dimensions.get('window');

interface NearbyMapProps {
	coordinates: Coordinates;
	region?: Region;
	onRegionChange(region: Region): void;
	emergencies: Emergency[];
}

const renderMarkers = (emergencies: Emergency[]) => {
	if (!emergencies) return null;
	return emergencies.map((emergency: Emergency, index: number) => (
		<MapView.Marker
			key={index}
			coordinate={{
				longitude: emergency.location.coordinates[0],
				latitude: emergency.location.coordinates[1]
			}}
		>
			<MapMarker size={16} />
		</MapView.Marker>
	));
};

const NearbyMap = ({
	coordinates,
	region,
	onRegionChange,
	emergencies
}: NearbyMapProps) => {
	return (
		emergencies && (
			<MapView
				style={styles.map}
				customMapStyle={mapStyle}
				provider='google'
				showsUserLocation
				initialRegion={{
					longitude: coordinates.longitude,
					latitude: coordinates.latitude,
					longitudeDelta: 0.00353,
					latitudeDelta: 0.00568
				}}
				onRegionChange={onRegionChange}
				{...{ region }}
				pitchEnabled={false}
				rotateEnabled={false}
				scrollEnabled={false}
				zoomEnabled={false}
			>
				{renderMarkers(emergencies.slice(0, 5))}
			</MapView>
		)
	);
};

const styles = StyleSheet.create({
	map: {
		height: height / 2,
		width: 0.9 * width,
		borderRadius: 6
	}
});

export default NearbyMap;
