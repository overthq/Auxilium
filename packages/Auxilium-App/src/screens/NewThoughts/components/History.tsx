import React from 'react';
import { View } from 'react-native';
import HistoryItem from './HistoryItem';

const History = ({ history }: { history: Emergency[] }) => {
	return (
		<View>
			{history.slice(1, 5).map((item, index) => (
				<HistoryItem key={index} {...item} />
			))}
		</View>
	);
};

export default History;
