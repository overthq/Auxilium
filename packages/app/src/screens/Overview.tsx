import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Modalize } from 'react-native-modalize';

import { MapContext } from '../contexts/MapContext';
import Overlay from '../components/Overlay';
import Report from '../components/Report';
import AddSafeSpotModal from '../components/modals/AddSafeSpotModal';
import SafeSpotsOverlay from '../components/overlays/SafeSpotsOverlay';
import NearbyOverlay from '../components/overlays/NearbyOverlay';
import ContactsOverlay from '../components/overlays/ContactsOverlay';
import SettingsOverlay from '../components/overlays/SettingsOverlay';

import { locate } from '../redux/location/actions';
import { fetchEmergencies } from '../redux/emergencies/actions';
import { getSafeSpots } from '../redux/safe-spots/actions';
import { useAppSelector } from '../../store';

const Overview: React.FC = () => {
	const emergencies = useAppSelector(
		({ emergencies }) => emergencies.emergencies
	);
	const dispatch = useDispatch();
	const addSafeSpotModalRef = React.useRef<Modalize>(null);
	const { map } = React.useContext(MapContext);

	React.useEffect(() => {
		dispatch(locate());
		dispatch(fetchEmergencies());
		dispatch(getSafeSpots());
	}, []);

	return (
		<SafeAreaView style={styles.container}>
			{map}
			<Overlay>
				<NearbyOverlay {...{ emergencies }} />
				<SafeSpotsOverlay modalRef={addSafeSpotModalRef} />
				<ContactsOverlay />
				<SettingsOverlay />
			</Overlay>
			<Report />
			<AddSafeSpotModal modalRef={addSafeSpotModalRef} />
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
