import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { MapContext } from '../contexts/MapContext';
import Overlay from '../components/Overlay';
import Report from '../components/Report';
import SafeSpotsOverlay from '../components/overlays/SafeSpotsOverlay';
import NearbyOverlay from '../components/overlays/NearbyOverlay';
import ContactsOverlay from '../components/overlays/ContactsOverlay';
import SettingsOverlay from '../components/overlays/SettingsOverlay';

import { locate } from '../redux/location/actions';
import { fetchEmergencies } from '../redux/emergencies/actions';
import { getSafeSpots } from '../redux/safe-spots/actions';

const Overview: React.FC = () => {
	const dispatch = useDispatch();
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
				<NearbyOverlay />
				<SafeSpotsOverlay />
				<ContactsOverlay />
				<SettingsOverlay />
			</Overlay>
			<Report />
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
