import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Dimensions,
	SafeAreaView,
	ScrollView,
	Alert
} from 'react-native';
import { connect } from 'react-redux';
import { MapView, Constants } from 'expo';
import { NavigationScreenProps } from 'react-navigation';
import io from 'socket.io-client';
import haversine from 'haversine';

import { Ionicons } from '@expo/vector-icons';
import mapStyle from './mapStyle';

import { LocationActions } from '../../redux/actions';
import env from '../../../env';
import { Emergencies } from '../../api';
import { NewMarker, MainButton, History } from './components';

const { width, height } = Dimensions.get('window');

interface HomeState {
	place: string;
	history: Emergency[] | void;
	emergencies: Emergency[] | void;
}

interface HomeProps extends NavigationScreenProps {
	coordinates: Coordinates;
	locate(): Promise<void>;
}

class Home extends React.Component<HomeProps, HomeState> {
	socket = io(env.apiUrl);

	state = {
		place: '',
		emergencies: [],
		history: []
	};

	async componentDidMount() {
		const {
			coordinates: { longitude, latitude },
			locate
		} = this.props;
		await locate();
		const place = await this.getAddressFromCoords({ longitude, latitude });
		const emergencies = await this.loadEmergencies(longitude, latitude);
		const history = await this.getUserHistory();
		await this.setState({ place, emergencies, history });

		// Set up socket
		this.socket.on('emergency', (emergency: Emergency) => {
			const distance = haversine(
				{ longitude, latitude },
				{
					longitude: emergency.location.coordinates[0],
					latitude: emergency.location.coordinates[1]
				}
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

	getAddressFromCoords = async ({ longitude, latitude }: Coordinates) => {
		try {
			const response = await fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoia29yZWRlMzYwIiwiYSI6ImNqZno1MGN2YjBhOTgyd2xlbWFhMGQ3dmwifQ.1AbAu_Ga4bu4iQCnOgBfog`
			);
			const { features } = await response.json();
			return features[2].place_name;
		} catch (error) {
			return Alert.alert(error.message);
		}
	};

	getUserHistory = async () => {
		const history = await Emergencies.getUserHistory();
		return history;
	};

	renderMarkers = (emergencies: Emergency[]) => {
		return emergencies.map((emergency: Emergency, index: number) => (
			<MapView.Marker
				key={index}
				coordinate={{
					longitude: emergency.location.coordinates[0],
					latitude: emergency.location.coordinates[1]
				}}
			>
				<NewMarker size={16} />
			</MapView.Marker>
		));
	};

	render() {
		const { place, emergencies, history } = this.state;
		const { coordinates, navigation } = this.props;
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView
					contentContainerStyle={{ flexGrow: 1, alignItems: 'center' }}
				>
					<View style={styles.top}>
						<Text style={styles.locationName}>{place}</Text>
						<Ionicons name='md-funnel' size={22} color='#D3D3D3' />
					</View>
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
					>
						{emergencies && this.renderMarkers(emergencies)}
					</MapView>
					<Text style={styles.sectionHeader}>History</Text>
					{history && <History {...{ history }} />}
				</ScrollView>
				<MainButton onPress={() => navigation.navigate('Popup')} />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1C1C1C',
		alignItems: 'center'
	},
	top: {
		width,
		padding: 0.05 * width,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 15
	},
	locationName: {
		fontSize: 20,
		fontFamily: 'Rubik Bold',
		letterSpacing: 1,
		color: '#D3D3D3'
	},
	sectionHeader: {
		fontSize: 20,
		fontFamily: 'Rubik Bold',
		letterSpacing: 1,
		color: '#D3D3D3',
		alignSelf: 'flex-start',
		padding: 0.05 * width
	},
	map: {
		height: height / 2,
		width: 0.9 * width,
		borderRadius: 6
	}
});

const mapStateToProps = ({ location: { coordinates } }: any) => ({
	coordinates
});

const mapDispatchToProps = {
	locate: LocationActions.locate
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Home);