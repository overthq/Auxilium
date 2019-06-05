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

interface IEmergencyMapState {
	route: Coordinates[];
	longitudeDelta: number;
	latitudeDelta: number;
	centerLongitude: number;
	centerLatitude: number;
}

class EmergencyMap extends React.PureComponent<
	IEmergencyMapProps,
	IEmergencyMapState
> {
	state = {
		route: [],
		longitudeDelta: 0,
		latitudeDelta: 0,
		centerLongitude: 0,
		centerLatitude: 0
	};

	async componentDidMount() {
		const { coordinates: fromCoords, pageDetails } = this.props;
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

		await this.setState({
			longitudeDelta,
			latitudeDelta,
			centerLongitude,
			centerLatitude
		});

		const from = fromCoords;
		const to = { longitude, latitude };
		const currentRoute =
			(await LocationHelpers.getNavigationRoute(from, to)) || [];
		this.setState({ route: currentRoute });
	}

	render() {
		const { pageDetails } = this.props;
		const {
			route,
			longitudeDelta,
			latitudeDelta,
			centerLongitude,
			centerLatitude
		} = this.state;

		const {
			location: {
				coordinates: [longitude, latitude]
			}
		} = pageDetails;

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
	}
}

const styles = StyleSheet.create({
	map: {
		width,
		height: height * 0.8
	}
});

export default EmergencyMap;
