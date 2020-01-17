import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Region, Marker, MapStyleElement } from 'react-native-maps';
import { getNearbyEmergencies } from '../api/Emergencies';
import { useAppSelector } from '../../store';
import MapMarker from '../components/MapMarker';
import darkMapStyle from '../styles/darkMapStyle';

interface MarkerOptions {
	location: {
		longitude: number;
		latitude: number;
	};
	color?: string;
	size?: number;
	onPress?: () => void;
}

interface MapContextValue {
	region: Region | undefined;
	map: React.ReactNode;
	toggleMapStyle(): void;
	setMarkers(markers: MarkerOptions[]): void;
	mapRef?: React.RefObject<MapView>;
	safeSpotMarkers: MarkerOptions[];
	nearbyEmergencyMarkers: MarkerOptions[];
}

export const MapContext = React.createContext<MapContextValue>({
	region: undefined,
	map: null,
	toggleMapStyle: () => {},
	setMarkers: () => {},
	mapRef: undefined,
	safeSpotMarkers: [],
	nearbyEmergencyMarkers: []
});

const renderMarkers = (markers: MarkerOptions[]) =>
	markers.map(({ location, size, color, onPress }, index) => (
		<Marker key={index} coordinate={location} onPress={onPress}>
			<MapMarker {...{ size, color }} />
		</Marker>
	));

// Map modes
// Mode 1 (default): Nearby emergencies
// Mode 2: Safe spots
// Mode 3: Safe spot and emergencies around it

// Mode 1 properties:
// - Centered on user's current location
// - Markers are red
// - Marker selection should open the emergency modal.

// Mode 2 properties:
// - All safe spots must be in frame
// - Markers are green
// - Marker selection focuses camera on marker, and emergencies around said marker

// Mode 3 properties:
// - Safe spot marker must be centered on the screen
// - Emergency marker selection should open the emergency details modal
// - Emergency markers have default properties
// - Safe spot marker is larger than the default and green in color

const getMarkersFromEmergencies = (emergencies: Emergency[]): MarkerOptions[] =>
	emergencies.map(({ location: { coordinates: [longitude, latitude] } }) => ({
		location: { longitude, latitude }
	}));

const longitudeDelta = 0.00353;
const latitudeDelta = 0.00568;

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
		longitudeDelta,
		latitudeDelta
	};

	const nearbyEmergencyMarkers = getMarkersFromEmergencies(emergencies);

	const safeSpotMarkers = safeSpots.map(safeSpot => {
		const {
			location: {
				coordinates: [longitude, latitude]
			}
		} = safeSpot;

		return {
			location: { longitude, latitude },
			color: 'green',
			size: 25,
			onPress: () => {
				focusSafeSpot(safeSpot);
			}
		};
	});

	const focusSafeSpot = async (safeSpot: SafeSpot) => {
		const [longitude, latitude] = safeSpot.location.coordinates;
		const safeSpotEmergencies = await getNearbyEmergencies({
			longitude,
			latitude
		});

		setMarkers([
			{
				location: { longitude, latitude },
				color: 'green',
				size: 30
			},
			...getMarkersFromEmergencies(safeSpotEmergencies)
		]);

		mapRef.current?.animateToRegion({
			longitude,
			latitude,
			longitudeDelta,
			latitudeDelta
		});
	};

	const [region, setRegion] = React.useState<Region>(initialRegion);
	const [mapStyle, setMapStyle] = React.useState<MapStyleElement[] | undefined>(
		darkMapStyle
	);
	const [markers, setMarkers] = React.useState<MarkerOptions[]>(
		nearbyEmergencyMarkers
	);
	const mapRef = React.useRef<MapView>(null);

	const toggleMapStyle = () => {
		if (mapStyle === darkMapStyle) {
			setMapStyle(undefined);
		}
		setMapStyle(darkMapStyle);
		mapRef.current?.forceUpdate();
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
			{renderMarkers(markers)}
		</MapView>
	);

	return (
		<MapContext.Provider
			value={{
				region,
				map,
				toggleMapStyle,
				setMarkers,
				mapRef,
				safeSpotMarkers,
				nearbyEmergencyMarkers
			}}
		>
			{children}
		</MapContext.Provider>
	);
};
