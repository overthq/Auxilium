import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Constants } from 'expo';
import { Region } from 'react-native-maps';
import { NavigationScreenProps } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

import { LocationActions, EmergenciesActions } from '../../../../redux/actions';
import { MainButton, AroundYou, NearbyMap } from './components';
import LocationHelpers from '../../../../helpers/location';
import styles from './styles';

interface OverviewState {
	place: string;
	region?: Region;
}

interface OverviewProps extends NavigationScreenProps {
	coordinates: Coordinates;
	emergencies: Emergency[];
	locate(): void;
	fetchEmergencies(): void;
}

class Overview extends React.PureComponent<OverviewProps, OverviewState> {
	constructor(props: OverviewProps) {
		super(props);
		props.fetchEmergencies();
		this.state = {
			place: '',
			region: undefined
		};
	}

	async componentDidMount() {
		const { coordinates } = this.props;
		const place = await LocationHelpers.getAddressFromCoords(coordinates);
		await this.setState({ place });
	}

	componentWillUnmount() {
		EmergenciesActions.socket.removeAllListeners();
	}

	askForHelp = async (description: string) => {
		const { locate, coordinates } = this.props;
		try {
			await locate();
			await EmergenciesActions.socket.emit('emergency', {
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

	onRegionChange = (region: Region) => {
		this.setState({ region });
	};

	render() {
		const { onRegionChange } = this;
		const { place, region } = this.state;
		const { coordinates, navigation, emergencies = [] } = this.props;
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView contentContainerStyle={styles.scrollContainer}>
					<View style={styles.top}>
						<Text style={styles.locationName}>{place}</Text>
						<Ionicons name='md-funnel' size={22} color='#D3D3D3' />
					</View>
					<NearbyMap
						{...{ coordinates, region, onRegionChange, emergencies }}
					/>
					<Text style={styles.sectionHeader}>Around You</Text>
					<AroundYou
						navigate={(emergency: Emergency) =>
							navigation.navigate('EmergencyDetails', {
								details: emergency
							})
						}
						{...{ emergencies }}
					/>
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

const Over = () => {
	return (
		
	)
}

const mapStateToProps = ({
	location: { coordinates },
	emergencies: { emergencies }
}: any) => ({
	coordinates,
	emergencies
});

const mapDispatchToProps = {
	locate: LocationActions.locate,
	fetchEmergencies: EmergenciesActions.fetchEmergencies
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Overview);
