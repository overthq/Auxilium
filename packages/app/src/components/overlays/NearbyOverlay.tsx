import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import HistoryItem from '../HistoryItem';
import { OverlaySlide } from '../Overlay';

const { width } = Dimensions.get('window');

interface NearbyOverlayProps {
	emergencies: Emergency[];
	open(emergency: Emergency): void;
}

const NearbyOverlay: React.FC<NearbyOverlayProps> = ({ emergencies, open }) => (
	<OverlaySlide title='Nearby'>
		{emergencies.length > 0 ? (
			emergencies.map(emergency => (
				<HistoryItem
					key={emergency._id}
					action={() => open(emergency)}
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

const styles = StyleSheet.create({
	emptyText: {
		color: '#777777',
		fontSize: 16,
		textAlign: 'center',
		width: width - 40
	}
});

export default NearbyOverlay;
