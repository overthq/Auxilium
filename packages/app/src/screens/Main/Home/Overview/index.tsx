import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';

import { LocationActions, EmergenciesActions } from '../../../../redux/actions';
import { MainButton, AroundYou, NearbyMap } from './components';
import styles from './styles';
import { Emergencies } from '../../../../api';

interface OverviewProps extends NavigationScreenProps {
	coordinates: Coordinates;
	place: string;
	emergencies: Emergency[];
	locate(): void;
	fetchEmergencies(): void;
}

const Overview = (props: OverviewProps) => {
	const { coordinates, place, navigation, emergencies = [] } = props;

	React.useEffect(() => {
		props.locate();
		props.fetchEmergencies();
	}, []);

	const askForHelp = async (description: string) => {
		try {
			await props.locate();
			Emergencies.createEmergency(description, coordinates);
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView contentContainerStyle={styles.scrollContainer}>
				<View style={styles.top}>
					<Text style={styles.locationName}>{place}</Text>
					<Ionicons name='md-funnel' size={22} color='#D3D3D3' />
				</View>
				<NearbyMap {...{ coordinates, emergencies }} />
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
						action: askForHelp
					})
				}
			/>
		</SafeAreaView>
	);
};

const mapStateToProps = ({
	location: { coordinates, place },
	emergencies: { emergencies }
}: any) => ({
	coordinates,
	place,
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
