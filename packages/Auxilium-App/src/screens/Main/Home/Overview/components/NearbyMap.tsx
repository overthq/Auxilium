import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { MapView, Region } from 'expo';
import mapStyle from '../mapStyle';

const { width, height } = Dimensions.get('window');

interface NearbyMapProps {
	coordinates: Coordinates;
	region?: Region;
	onRegionChange(region: Region): void;
	children: React.ReactNode;
}

const NearbyMap = ({
	coordinates,
	region,
	onRegionChange,
	children
}: NearbyMapProps) => {
	return (
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
			{children}
		</MapView>
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
