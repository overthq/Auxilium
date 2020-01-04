import React from 'react';
import HistoryItem from './HistoryItem';
import { Text, Dimensions, StyleSheet, FlatList } from 'react-native';

const { width } = Dimensions.get('window');

interface AroundYouProps {
	emergencies: Emergency[];
	open(emergency: Emergency): void;
}

const AroundYou: React.FC<AroundYouProps> = ({ emergencies, open }) => (
	<FlatList
		style={styles.container}
		contentContainerStyle={styles.scroll}
		data={emergencies}
		keyExtractor={({ _id }) => _id}
		renderItem={({ item }) => (
			<HistoryItem action={() => open(item)} {...item} />
		)}
		ListEmptyComponent={
			<Text style={styles.emptyText}>
				There are currently no emergencies in your vicinity.
			</Text>
		}
	/>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: 'transparent',
		bottom: 0,
		...StyleSheet.absoluteFillObject
	},
	scroll: {
		alignItems: 'center',
		justifyContent: 'flex-end'
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
