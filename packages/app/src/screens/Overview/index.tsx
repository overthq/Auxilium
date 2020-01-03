import React from 'react';
import { View, SafeAreaView, ScrollView, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { NavigationScreenProp } from 'react-navigation';

import { LocationActions, EmergenciesActions } from '../../redux/actions';
import { MainButton, AroundYou, NearbyMap, PopupModal } from './components';
import styles from './styles';
import { Emergencies } from '../../api';
import DetailsModal from './components/DetailsModal';
import { RootState } from '../../../store';

const stateMapper = ({ location, emergencies }: RootState) => ({
	coordinates: location.coordinates,
	emergencies: emergencies.emergencies
});

const handleModalOpen = (ref: React.RefObject<Modalize>) => {
	ref.current && ref.current.open();
};

interface OverviewProps {
	navigation: NavigationScreenProp<any, any>;
}

const Overview: React.FC<OverviewProps> = ({ navigation }) => {
	const { coordinates, emergencies } = useSelector(stateMapper);
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
				Emergencies.reportEmergency(description, coordinates);
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
			<NearbyMap {...{ coordinates, emergencies }} />
			<ScrollView
				contentContainerStyle={styles.actions}
				showsVerticalScrollIndicator={false}
			>
				<AroundYou
					navigate={handleEmergencyOpen}
					emergencies={emergencies.slice(0, 5)}
				/>
				<MainButton onPress={() => handleModalOpen(modalRef)} />
			</ScrollView>
			<PopupModal {...{ modalRef, action: askForHelp }} />
			<DetailsModal modalRef={emergencyModalRef} emergency={activeEmergency} />
		</SafeAreaView>
	);
};

export default React.memo(Overview);
