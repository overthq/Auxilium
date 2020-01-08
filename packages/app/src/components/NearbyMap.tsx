import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import MapMarker from './MapMarker';
import mapStyle from './styles/mapStyle';

interface NearbyMapProps {
	coordinates: EmergencyCoordinates;
	emergencies: Emergency[];
}

const renderMarkers = (emergencies: Emergency[]) =>
	emergencies.map(({ location }, index) => {
		const [longitude, latitude] = location.coordinates;
		return (
			<Marker key={index} coordinate={{ longitude, latitude }}>
				<MapMarker size={20} />
			</Marker>
		);
	});

const NearbyMap: React.FC<NearbyMapProps> = ({
	coordinates: { longitude, latitude },
	emergencies
}) => {
	const [region, setRegion] = React.useState<Region | undefined>(undefined);

	return (
		<MapView
			style={StyleSheet.absoluteFillObject}
			customMapStyle={mapStyle}
			provider='google'
			showsUserLocation
			initialRegion={{
				longitude,
				latitude,
				longitudeDelta: 0.00353,
				latitudeDelta: 0.00568
			}}
			{...{ region }}
			onRegionChange={setRegion}
			pitchEnabled={false}
			rotateEnabled={false}
			scrollEnabled={false}
			zoomEnabled={false}
		>
			{renderMarkers(emergencies)}
		</MapView>
	);
};

export default NearbyMap;
