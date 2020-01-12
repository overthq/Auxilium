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

interface MarkersConfig {
	elements: (Emergency | SafeSpot)[];
	// Yes, I'm aware that the above is not equivalent to Emergency[] | SafeSpot[]
	color?: string;
	onPress?: (location: EmergencyCoordinates) => void;
}

const renderMarkers = ({ elements, color, onPress }: MarkersConfig) =>
	elements.map(({ location }, index) => {
		const [longitude, latitude] = location.coordinates;
		return (
			<Marker key={index} coordinate={{ longitude, latitude }}>
				<MapMarker onPress={() => onPress} size={20} color={color} />
			</Marker>
		);
	});

// TODO: Add map 'modes'
// Mode 1 (Default): Emergencies
// Mode 2: Safe spots

// Mode 1 properties:
// - Centered on user's current location
// - Markers are not tappable, at least for now, or maybe later?
// - Markers are red

// Mode 2 properties:
// - All safe spots must be in frame
// - Markers are tappable
// - Markers are green
// - Marker selection focuses camera on marker, and emergencies around said marker

// So technically, mode 2 has 2 modes:
// General safe spots overview, and
// Individual safe-spot information.

export const MapProvider: React.FC = ({ children }) => {
	const { coordinates, emergencies, safeSpots } = useAppSelector(
		({ location, emergencies, safeSpots }) => ({
			coordinates: location.coordinates,
			emergencies: emergencies.emergencies,
			safeSpots: safeSpots.safeSpots
		})
	);

	const initialRegion = {
		longitude: coordinates.longitude,
		latitude: coordinates.latitude,
		longitudeDelta: 0.00353,
		latitudeDelta: 0.00568
	};

	const [region, setRegion] = React.useState<Region>(initialRegion);
	const [mode, setMode] = React.useState<'emergencies' | 'safeSpots'>(
		'emergencies'
	);
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

	React.useEffect(() => {
		if (mode === 'safeSpots') {
			mapRef.current?.fitToElements(true);
		}
	}, [mode]);

	const emergenciesMode = mode === 'emergencies';

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
			{renderMarkers(
				emergenciesMode
					? { elements: emergencies }
					: { elements: safeSpots, color: 'green', onPress: centerOnCoords }
			)}
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
