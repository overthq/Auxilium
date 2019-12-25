import React from 'react';
import HistoryItem from './HistoryItem';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface AroundYouProps {
	emergencies: Emergency[];
	navigate(emergency: Emergency): void;
}

const AroundYou = ({ emergencies, navigate }: AroundYouProps) => (
	<View style={{ alignItems: 'center' }}>
		{emergencies ? (
			emergencies.map((emergency, index) => (
				<HistoryItem
					key={index}
					onPress={() => navigate(emergency)}
					{...emergency}
				/>
			))
		) : (
			<Text style={styles.emptyText}>
				There are currently no emergencies in your vicinity.
			</Text>
		)}
	</View>
);

const styles = StyleSheet.create({
	emptyText: {
		color: '#777777',
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		textAlign: 'center',
		width: width - 40
	}
});

export default AroundYou;
