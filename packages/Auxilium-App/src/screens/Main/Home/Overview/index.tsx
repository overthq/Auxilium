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
import { MapView, Constants, Region } from 'expo';
import { NavigationScreenProps } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import mapStyle from './mapStyle';
import { LocationActions, EmergenciesActions } from '../../../../redux/actions';
import { Emergencies } from '../../../../api';
import { MapMarker, MainButton, AroundYou } from './components';
import LocationHelpers from '../../../../helpers/location';

const { width, height } = Dimensions.get('window');

interface OverviewState {
	place: string;
	region?: Region;
}

interface OverviewProps extends NavigationScreenProps {
	coordinates: Coordinates;
	emergencies: Emergency[];
	locate(): Promise<void>;
}

class Overview extends React.Component<OverviewProps, OverviewState> {
	state = {
		place: '',
		region: undefined
	};

	async componentDidMount() {
		const {
			coordinates: { longitude, latitude }
		} = this.props;
		const place = await LocationHelpers.getAddressFromCoords({
			longitude,
			latitude
		});
		await this.setState({ place });
	}

	shouldComponentUpdate(nextProps: OverviewProps) {
		const {
			coordinates: { longitude, latitude },
			locate
		} = this.props;
		const {
			coordinates: { longitude: nextLongitude, latitude: nextLatitude }
		} = nextProps;
		locate();
		return longitude === nextLongitude && latitude === nextLatitude;
	}

	componentWillUnmount() {
		EmergenciesActions.socket.removeAllListeners();
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

	askForHelp = async (description: string) => {
		const { locate, coordinates } = this.props;
		try {
			await locate();
			EmergenciesActions.socket.emit('emergency', {
				deviceId: Constants.deviceId,
				location: {
					type: 'Point',
					coordinates: [coordinates.longitude, coordinates.latitude]
				},
				description
			});
			EmergenciesActions.fetchEmergencies();
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	renderMarkers = (emergencies: Emergency[]) => {
		return (
			emergencies &&
			emergencies.map((emergency: Emergency, index: number) => (
				<MapView.Marker
					key={index}
					coordinate={{
						longitude: emergency.location.coordinates[0],
						latitude: emergency.location.coordinates[1]
					}}
				>
					<MapMarker size={16} />
				</MapView.Marker>
			))
		);
	};

	onRegionChange = (region: Region) => {
		this.setState({ region });
	};

	render() {
		const { place, region } = this.state;
		const { coordinates, navigation, emergencies } = this.props;
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
						onRegionChange={this.onRegionChange}
						{...{ region }}
						pitchEnabled={false}
						rotateEnabled={false}
						scrollEnabled={false}
						zoomEnabled={false}
					>
						{emergencies && this.renderMarkers(emergencies.slice(0, 5))}
					</MapView>
					<Text style={styles.sectionHeader}>Around You</Text>
					{emergencies && (
						<AroundYou
							navigate={(emergency: Emergency) =>
								navigation.navigate('EmergencyDetails', {
									details: emergency
								})
							}
							{...{ emergencies }}
						/>
					)}
				</ScrollView>
				<MainButton
					onPress={() =>
						navigation.navigate('Popup', {
							action: this.askForHelp
						})
					}
				/>
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

const mapStateToProps = ({
	location: { coordinates },
	emergencies: { emergencies }
}: any) => ({
	coordinates,
	emergencies
});

const mapDispatchToProps = { locate: LocationActions.locate };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Overview);
