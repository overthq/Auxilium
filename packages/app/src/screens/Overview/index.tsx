import React from 'react';
import { SafeAreaView, Text, Alert, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { NavigationScreenProp } from 'react-navigation';

import { LocationActions, EmergenciesActions } from '../../redux/actions';
import { MainButton, AroundYou, NearbyMap, PopupModal } from './components';
import { Emergencies } from '../../api';
import DetailsModal from './components/DetailsModal';
import Overlay, { OverlaySlide } from '../../components/Overview/Overlay';
import { RootState } from '../../../store';

const stateMapper = ({ location, emergencies }: RootState) => ({
	coordinates: location.coordinates,
	emergencies: emergencies.emergencies
});

const handleModalOpen = (ref: React.RefObject<Modalize>) => {
	ref.current?.open();
};

interface OverviewProps {
	navigation: NavigationScreenProp<any>;
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
		if (initialEmergency) openEmergency(initialEmergency);
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

	const openEmergency = (emergency: Emergency) => {
		setActiveEmergency(emergency);
		handleModalOpen(emergencyModalRef);
	};

	return (
		<SafeAreaView style={styles.container}>
			<NearbyMap {...{ coordinates, emergencies }} />
			<Overlay>
				<AroundYou open={openEmergency} {...{ emergencies }} />
				<OverlaySlide title='Safe Spots'></OverlaySlide>
				<OverlaySlide title='Contacts'></OverlaySlide>
				<OverlaySlide title='Settings'></OverlaySlide>
			</Overlay>
			<MainButton onPress={() => handleModalOpen(modalRef)} />
			<PopupModal action={askForHelp} {...{ modalRef }} />
			<DetailsModal modalRef={emergencyModalRef} emergency={activeEmergency} />
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center'
	}
});

export default Overview;
