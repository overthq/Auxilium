import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import HistoryItem from '../HistoryItem';
import { OverlaySlide } from '../Overlay';
import { EmergencyContext } from '../../contexts/EmergencyContext';

const { width } = Dimensions.get('window');

interface NearbyOverlayProps {
	emergencies: Emergency[];
}

const NearbyOverlay: React.FC<NearbyOverlayProps> = ({ emergencies }) => {
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
