import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import haversine from 'haversine';
/* eslint-disable-next-line */
import io from 'socket.io-client';
import { CustomMarker } from './components';
import mapStyle from './mapStyle';
import { LocationActions } from '../../../redux/actions';
import env from '../../../../env';
import { Emergencies } from '../../../api';

interface MainMapState {
	emergencies: Emergency[];
}

interface MainMapProps {
	coordinates: Coordinates;
	locate(): Promise<void>;
}

class MainMap extends React.Component<MainMapProps, MainMapState> {
	socket = io(env.apiUrl);

	constructor(props: MainMapProps) {
		super(props);
		const {
			coordinates: { longitude, latitude }
		} = props;
		const emergencies = this.loadEmergencies(longitude, latitude);
		this.state = { emergencies };
	}

	async componentDidMount() {
		const { emergencies } = this.state;
		const { locate } = this.props;
		await locate();
		const { coordinates } = this.props;
		this.socket.on('emergency', (emergency: Emergency) => {
			Alert.alert('Emergency received!');
			const distance = haversine(
				{ ...coordinates },
				{ ...emergency.location.coordinates }
			);
			if (Math.round(distance) <= 1) {
				this.setState({ emergencies: [...emergencies, emergency] });
			}
		});
	}

	loadEmergencies = async (longitude: number, latitude: number) => {
		const emergencies = await Emergencies.getNearbyEmergencies({
			longitude,
			latitude
		});
		return emergencies;
	};

	render() {
		const { emergencies } = this.state;
		const { coordinates } = this.props;
		return (
			<MapView
				style={{ flex: 1 }}
				provider='google'
				showsUserLocation
				initialRegion={{
					longitude: coordinates.longitude,
					latitude: coordinates.latitude,
					longitudeDelta: 0.00353,
					latitudeDelta: 0.00568
				}}
				customMapStyle={mapStyle}
			>
				{emergencies &&
					emergencies.map((emergency: Emergency, index: number) => {
						return (
							<MapView.Marker
								key={index}
								coordinate={emergency.location.coordinates}
							>
								<CustomMarker size={10} />
							</MapView.Marker>
						);
					})}
			</MapView>
		);
	}
}

const mapStateToProps = ({ location: { coordinates } }: any) => ({
	coordinates
});
const mapDispatchToProps = { locate: LocationActions.locate };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMap);
