import React from 'react';
import { connect } from 'react-redux';
import { MapView } from 'expo';
import { CustomMarker } from './components';
import mapStyle from './mapStyle';
import { Emergencies } from '../../../api';
import locate from '../../../redux/actions/Location';

interface Coordinates {
	longitude: number;
	latitude: number;
}

interface Emergency {
	deviceId: string;
	coordinates: Coordinates;
}

interface MainMapState {
	emergencies: Emergency[] | void;
}

interface MainMapProps {
	coordinates: {
		longitude: number;
		latitude: number;
	};
	locate(): Promise<void>;
}

class MainMap extends React.Component<MainMapProps, MainMapState> {
	state = {
		emergencies: []
	};

	async componentDidMount() {
		/* eslint-disable-next-line no-shadow */
		const { locate } = this.props;
		await locate();
		const { coordinates } = this.props;
		setTimeout(
			(async () => {
				const emergencies:
					| Emergency[]
					| void = await Emergencies.getNearbyEmergencies(coordinates);
				this.setState({ emergencies });
			})(),
			5000
		);
	}

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
							<MapView.Marker key={index} coordinate={emergency.coordinates}>
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
const mapDispatchToProps = { locate };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMap);
