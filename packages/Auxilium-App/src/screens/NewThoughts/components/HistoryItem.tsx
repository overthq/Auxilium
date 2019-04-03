import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const HistoryItem = () => (
	<View style={styles.historySection}>
		<View style={{ display: 'flex', flexDirection: 'row' }}>
			<Feather name='navigation' size={16} color='#D3D3D3' />
			<Text style={styles.locationText}>
				{'  '}
				Lagos, Nigeria
			</Text>
		</View>
	</View>
);

const styles = {
	historySection: {
		borderRadius: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		width: 0.9 * width,
		height: 60,
		padding: 10,
		marginBottom: 10
	},
	locationText: {
		fontFamily: 'Rubik Regular',
		textTransform: 'uppercase' as 'uppercase',
		letterSpacing: 1,
		color: '#D3D3D3'
	}
};

export default HistoryItem;
