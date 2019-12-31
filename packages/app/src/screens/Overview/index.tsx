import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { MaterialIcons } from '@expo/vector-icons';
import { Modalize } from 'react-native-modalize';
import { NavigationScreenProp } from 'react-navigation';

import { LocationActions, EmergenciesActions } from '../../redux/actions';
import { MainButton, AroundYou, NearbyMap, PopupModal } from './components';
import styles from './styles';
import { Emergencies } from '../../api';
import DetailsModal from './components/DetailsModal';

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

const handleModalOpen = (ref: React.RefObject<Modalize>) => {
	ref.current && ref.current.open();
};

interface OverviewProps {
	navigation: NavigationScreenProp<any, any>;
}

const Overview = ({ navigation }: OverviewProps) => {
	const { coordinates, place, emergencies } = useSelector(stateMapper);
	const [activeEmergency, setActiveEmergency] = React.useState<Emergency>(
		emergencies[0] || undefined
	);
	const dispatch = useDispatch();
	const modalRef = React.useRef<Modalize>(null);
	const emergencyModalRef = React.useRef<Modalize>(null);

	React.useEffect(() => {
		dispatch(LocationActions.locate());
		dispatch(EmergenciesActions.fetchEmergencies());
		handleInitialEmergency();
	}, []);

	const handleInitialEmergency = async () => {
		const initialEmergency = await navigation.getParam('initialEmergency');
		if (initialEmergency) handleEmergencyOpen(initialEmergency);
	};

	const askForHelp = React.useCallback(
		async (description: string) => {
			try {
				dispatch(LocationActions.locate(false));
				Emergencies.createEmergency(description, coordinates);
			} catch (error) {
				Alert.alert(error.message);
			}
		},
		[coordinates]
	);

	const handleEmergencyOpen = (emergency: Emergency) => {
		setActiveEmergency(emergency);
		handleModalOpen(emergencyModalRef);
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView
				contentContainerStyle={styles.scrollContainer}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.sectionHeader}>
					<MaterialIcons
						name='near-me'
						color='#D3D3D3'
						size={18}
						style={{ marginRight: 10 }}
					/>
					<Text style={styles.sectionHeaderText}>{place}</Text>
				</View>
				<NearbyMap {...{ coordinates, emergencies }} />
				<Text style={[styles.sectionHeader, styles.sectionHeaderText]}>
					Around You
				</Text>
				<AroundYou
					navigate={handleEmergencyOpen}
					emergencies={emergencies.slice(0, 5)}
				/>
			</ScrollView>
			<MainButton onPress={() => handleModalOpen(modalRef)} />
			<PopupModal {...{ modalRef, action: askForHelp }} />
			<DetailsModal modalRef={emergencyModalRef} emergency={activeEmergency} />
		</SafeAreaView>
	);
};

export default React.memo(Overview);
