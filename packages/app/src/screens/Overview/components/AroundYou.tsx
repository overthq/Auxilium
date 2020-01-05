import React from 'react';
import { Text, Dimensions, StyleSheet } from 'react-native';
import HistoryItem from './HistoryItem';
import { OverlaySlide } from '../../../components/Overview/Overlay';

const { width } = Dimensions.get('window');

interface AroundYouProps {
	emergencies: Emergency[];
	open(emergency: Emergency): void;
}

const AroundYou: React.FC<AroundYouProps> = ({ emergencies, open }) => (
	<OverlaySlide>
		<Text style={styles.title}>Nearby</Text>
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
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 24,
		alignSelf: 'flex-start',
		color: '#D3D3D3',
		marginVertical: 7.5
	},
	emptyText: {
		color: '#777777',
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		textAlign: 'center',
		width: width - 40
	}
});

export default AroundYou;
