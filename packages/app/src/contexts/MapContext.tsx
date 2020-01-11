import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Region, Marker, MapStyleElement } from 'react-native-maps';
import { useAppSelector } from '../../store';
import MapMarker from '../components/MapMarker';
import darkMapStyle from '../components/styles/darkMapStyle';

interface MapContextValue {
	region: Region | undefined;
	map: React.ReactNode;
	toggleMapStyle(): void;
	centerOnCoords(coords: EmergencyCoordinates): void;
}

export const MapContext = React.createContext<MapContextValue>({
	region: undefined,
	map: null,
	toggleMapStyle: () => {},
	centerOnCoords: () => {}
});

const renderMarkers = (emergencies: Emergency[]) =>
	emergencies.map(({ location }, index) => {
		const [longitude, latitude] = location.coordinates;
		return (
			<Marker key={index} coordinate={{ longitude, latitude }}>
				<MapMarker size={20} />
			</Marker>
		);
	});

export const MapProvider: React.FC = ({ children }) => {
	const { coordinates, emergencies } = useAppSelector(
		({ location, emergencies }) => ({
			coordinates: location.coordinates,
			emergencies: emergencies.emergencies
		})
	);

	const initialRegion = {
		longitude: coordinates.longitude,
		latitude: coordinates.latitude,
		longitudeDelta: 0.00353,
		latitudeDelta: 0.00568
	};

	const [region, setRegion] = React.useState<Region>(initialRegion);
	const [mapStyle, setMapStyle] = React.useState<MapStyleElement[] | undefined>(
		darkMapStyle
	);
	const mapRef = React.useRef<MapView>(null);

	const toggleMapStyle = () => {
		if (mapStyle === darkMapStyle) {
			setMapStyle(undefined);
		}
		setMapStyle(darkMapStyle);
		mapRef.current?.forceUpdate();
	};

	const centerOnCoords = (coordinates: EmergencyCoordinates) => {
		mapRef.current?.animateCamera({ center: coordinates }, { duration: 3000 });
	};

	const map = (
		<MapView
			style={StyleSheet.absoluteFillObject}
			customMapStyle={mapStyle}
			provider='google'
			showsUserLocation
			followsUserLocation
			onRegionChange={setRegion}
			pitchEnabled={false}
			rotateEnabled={false}
			scrollEnabled={false}
			zoomEnabled={false}
			ref={mapRef}
			{...{ initialRegion }}
		>
			{renderMarkers(emergencies)}
		</MapView>
	);

	return (
		<MapContext.Provider
			value={{ region, map, toggleMapStyle, centerOnCoords }}
		>
			{children}
		</MapContext.Provider>
	);
};
