import React from 'react';
import { Dimensions } from 'react-native';
import MapView, { Region, Marker } from 'react-native-maps';
import { getNearbyEmergencies } from '../api/Emergencies';
import { useAppSelector } from '../../store';
import MapMarker from '../components/MapMarker';
import { EmergencyContext } from './EmergencyContext';

const { width, height } = Dimensions.get('window');

interface MarkerOptions {
	location: Record<'longitude' | 'latitude', number>;
	color?: string;
	size?: number;
	onPress?: () => void;
}

interface MapContextValue {
	region?: Region;
	map: React.ReactNode;
	setMarkers(markers: MarkerOptions[]): void;
	mapRef?: React.RefObject<MapView>;
	safeSpotMarkers: MarkerOptions[];
	nearbyEmergencyMarkers: MarkerOptions[];
}

export const MapContext = React.createContext<MapContextValue>({
	region: undefined,
	map: null,
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

const longitudeDelta = 0.00353;
const latitudeDelta = 0.00568;

export const MapProvider: React.FC = ({ children }) => {
	const { coordinates, emergencies, safeSpots, theme } = useAppSelector(
		({ location, emergencies, safeSpots, theme }) => ({
			coordinates: location.coordinates,
			emergencies: emergencies.emergencies,
			safeSpots: safeSpots.safeSpots,
			theme
		})
	);
	const { openEmergency } = React.useContext(EmergencyContext);

	const initialRegion = React.useMemo(
		() => ({
			longitude: coordinates.longitude,
			latitude: coordinates.latitude,
			longitudeDelta,
			latitudeDelta
		}),
		[coordinates]
	);

	const getMarkersFromEmergencies = (
		emergencies: Emergency[]
	): MarkerOptions[] =>
		emergencies.map(emergency => {
			const {
				location: {
					coordinates: [longitude, latitude]
				}
			} = emergency;
			return {
				location: { longitude, latitude },
				onPress: () => openEmergency(emergency)
			};
		});

	const nearbyEmergencyMarkers = getMarkersFromEmergencies(emergencies);

	const safeSpotMarkers = safeSpots.map(safeSpot => {
		const {
			location: {
				coordinates: [longitude, latitude]
			}
		} = safeSpot;

		return {
			location: { longitude, latitude },
			color: '#90C669',
			size: 30,
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
				color: '#90C669',
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
	const [markers, setMarkers] = React.useState<MarkerOptions[]>(
		nearbyEmergencyMarkers
	);
	const mapRef = React.useRef<MapView>(null);

	const map = React.useMemo(
		() => (
			<MapView
				style={{ width, height: height / 2 }}
				customMapStyle={theme.mapStyle}
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
		),
		[initialRegion, theme]
	);

	return (
		<MapContext.Provider
			value={{
				region,
				map,
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
