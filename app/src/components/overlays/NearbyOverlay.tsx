import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import HistoryItem from '../HistoryItem';
import { OverlaySlide } from '../Overlay';
import { EmergencyContext } from '../../contexts/EmergencyContext';
import { useAppSelector } from '../../../store';

const { width } = Dimensions.get('window');

const NearbyOverlay: React.FC = () => {
	const emergencies = useAppSelector(
		({ emergencies }) => emergencies.emergencies
	);
	const { openEmergency } = React.useContext(EmergencyContext);

	return (
		<OverlaySlide title='Nearby'>
			{emergencies.length > 0 ? (
				emergencies.map(emergency => (
					<HistoryItem
						key={emergency._id}
						action={() => openEmergency(emergency)}
						{...emergency}
					/>
				))
			) : (
				<Text style={styles.emptyText}>
					There are currently no emergencies in your vicinity.
				</Text>
			)}
		</OverlaySlide>
	);
};

const styles = StyleSheet.create({
	emptyText: {
		color: '#777777',
		fontSize: 16,
		textAlign: 'center',
		width: width - 40
	}
});

export default NearbyOverlay;
