import React from 'react';
import {
	Alert,
	StatusBar,
	TouchableOpacity,
	View,
	StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import MapView from 'react-native-maps';
import * as Constants from 'expo-constants';
import haversine from 'haversine';
import { Feather } from '@expo/vector-icons';
/* eslint-disable-next-line */
import io from 'socket.io-client';
import { CustomMarker } from './components';
import { LocationActions } from '../../../redux/actions';
import env from '../../../../env';
import { Emergencies } from '../../../api';
import { ThemeConsumer } from '../../../context';

interface MainMapState {
	emergencies: Emergency[] | void;
}

interface MainMapProps {
	coordinates: Coordinates;
	locate(): Promise<void>;
}

class MainMap extends React.Component<MainMapProps, MainMapState> {
	socket = io(env.apiUrl);

	state = {
		emergencies: []
	};

	async componentDidMount() {
		// const { emergencies } = this.state;
		const { locate, coordinates } = this.props;
		const { longitude, latitude } = coordinates;
		await locate();
		const emergencies = await this.loadEmergencies(longitude, latitude);
		await this.setState({ emergencies });
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
		try {
			const emergencies = await Emergencies.getNearbyEmergencies({
				longitude,
				latitude
			});
			return emergencies;
		} catch (error) {
			return Alert.alert(error.message);
		}
	};

	askForHelp = async () => {
		const { locate, coordinates } = this.props;
		try {
			await locate();
			this.socket.emit('emergency', {
				deviceId: Constants.deviceId,
				location: {
					type: 'Point',
					coordinates: [coordinates.longitude, coordinates.latitude]
				}
			});
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	render() {
		const { emergencies } = this.state;
		const { coordinates } = this.props;
		StatusBar.setBarStyle('light-content');
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<View
						style={[
							styles.container,
							{ flex: 1, backgroundColor: 'transparent' }
						]}
					>
						<MapView
							style={styles.container}
							provider='google'
							showsUserLocation
							initialRegion={{
								longitude: coordinates.longitude,
								latitude: coordinates.latitude,
								longitudeDelta: 0.00353,
								latitudeDelta: 0.00568
							}}
							customMapStyle={theme.mapStyle}
						>
							{emergencies &&
								emergencies.map((emergency: Emergency, index: number) => {
									return (
										<MapView.Marker
											key={index}
											coordinate={{
												longitude: emergency.location.coordinates[0],
												latitude: emergency.location.coordinates[1]
											}}
										>
											<CustomMarker size={10} />
										</MapView.Marker>
									);
								})}
						</MapView>
						<TouchableOpacity
							style={{ position: 'absolute', bottom: 50, right: 20 }}
							onPress={this.askForHelp}
						>
							<View
								style={{
									width: 60,
									height: 60,
									borderRadius: 30,
									backgroundColor: '#FF8282',
									display: 'flex',
									alignItems: 'center',
									justifyContent: 'center'
								}}
							>
								<Feather name='alert-circle' size={35} color='#FFFFFF' />
							</View>
						</TouchableOpacity>
					</View>
				)}
			</ThemeConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		top: 0,
		left: 0,
		right: 0,
		bottom: 0
	}
});

const mapStateToProps = ({ location: { coordinates } }: any) => ({
	coordinates
});
const mapDispatchToProps = { locate: LocationActions.locate };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(MainMap);
