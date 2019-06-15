import React from 'react';
import HistoryItem from './HistoryItem';
import { Text, FlatList, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface AroundYouProps {
	emergencies: Emergency[];
	navigate(emergency: Emergency): void;
}

const AroundYou = ({ emergencies, navigate }: AroundYouProps) => (
	<FlatList
		contentContainerStyle={{ alignItems: 'center' }}
		data={emergencies}
		keyExtractor={emergency => emergency._id}
		renderItem={({ item, index }) => (
			<HistoryItem key={index} onPress={() => navigate(item)} {...item} />
		)}
		ListEmptyComponent={() => (
			<Text
				style={{
					color: '#777777',
					fontFamily: 'Rubik Regular',
					fontSize: 16,
					textAlign: 'center',
					width: width - 40
				}}
			>
				There are currently no emergencies in your vicinity.
			</Text>
		)}
	/>
);

export default AroundYou;
