import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';
import { NavigationScreenProp } from 'react-navigation';

import DetailsModal from '../components/modals/DetailsModal';
import Overlay from '../components/Overlay';
import NearbyMap from '../components/NearbyMap';
import SafeSpotsOverlay from '../components/overlays/SafeSpotsOverlay';
import NearbyOverlay from '../components/overlays/NearbyOverlay';
import ContactsOverlay from '../components/overlays/ContactsOverlay';
import SettingsOverlay from '../components/overlays/SettingsOverlay';
import Report from '../components/Report';

import { locate } from '../redux/location/actions';
import { fetchEmergencies } from '../redux/emergencies/actions';
import { useAppSelector } from '../../store';

const handleModalOpen = (ref: React.RefObject<Modalize>) => {
	ref.current?.open();
};

interface OverviewProps {
	navigation: NavigationScreenProp<any>;
}

const Overview: React.FC<OverviewProps> = ({ navigation }) => {
	const { coordinates, emergencies } = useAppSelector(
		({ location, emergencies }) => ({
			coordinates: location.coordinates,
			emergencies: emergencies.emergencies
		})
	);
	const [activeEmergency, setActiveEmergency] = React.useState<Emergency>(
		emergencies[0] || undefined
	);
	const dispatch = useDispatch();
	const emergencyModalRef = React.useRef<Modalize>(null);

	React.useEffect(() => {
		dispatch(locate());
		dispatch(fetchEmergencies());
		handleInitialEmergency();
	}, []);

	const handleInitialEmergency = () => {
		const initialEmergency = navigation.getParam('initialEmergency');
		if (initialEmergency) openEmergency(initialEmergency);
	};

	const openEmergency = (emergency: Emergency) => {
		setActiveEmergency(emergency);
		handleModalOpen(emergencyModalRef);
	};

	return (
		<SafeAreaView style={styles.container}>
			<NearbyMap {...{ coordinates, emergencies }} />
			<Overlay>
				<NearbyOverlay open={openEmergency} {...{ emergencies }} />
				<SafeSpotsOverlay />
				<ContactsOverlay />
				<SettingsOverlay />
			</Overlay>
			<Report />
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
