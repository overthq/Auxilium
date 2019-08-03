import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';
import Modalize from 'react-native-modalize';

import { LocationActions, EmergenciesActions } from '../../../redux/actions';
import { MainButton, AroundYou, NearbyMap, PopupModal } from './components';
import styles from './styles';
import { Emergencies } from '../../../api';

interface OverviewState {
	location: {
		coordinates: EmergencyCoordinates;
		place: string;
	};
	emergencies: {
		emergencies: Emergency[];
	};
}

const stateMapper = ({ location, emergencies }: OverviewState) => ({
	coordinates: location.coordinates,
	place: location.place,
	emergencies: emergencies.emergencies
});

const Overview = ({ navigation }: NavigationScreenProps) => {
	const { coordinates, place, emergencies } = useSelector(stateMapper);
	const dispatch = useDispatch();
	const modalRef = React.useRef<Modalize>(null);

	React.useEffect(() => {
		dispatch(LocationActions.locate());
		dispatch(EmergenciesActions.fetchEmergencies());
	}, []);

	const askForHelp = React.useCallback(
		async (description: string) => {
			try {
				await dispatch(LocationActions.locate(false));
				Emergencies.createEmergency(description, coordinates);
			} catch (error) {
				Alert.alert(error.message);
			}
		},
		[coordinates]
	);

	const handleModalOpen = () => {
		modalRef.current && modalRef.current.open();
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
					emergencies={emergencies.slice(0, 5)}
				/>
			</ScrollView>
			<MainButton onPress={handleModalOpen} />
			<PopupModal {...{ modalRef, action: askForHelp }} />
		</SafeAreaView>
	);
};

export default React.memo(Overview);
