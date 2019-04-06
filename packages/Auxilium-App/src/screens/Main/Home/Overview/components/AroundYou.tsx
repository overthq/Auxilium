import React from 'react';
import HistoryItem from './HistoryItem';

interface AroundYouProps {
	emergencies: Emergency[];
	navigate(emergency: Emergency): void;
}

const AroundYou = ({ emergencies, navigate }: AroundYouProps) => (
	<>
		{emergencies.slice(0, 5).map((item, index) => (
			<HistoryItem key={index} {...item} onPress={() => navigate(item)} />
		))}
	</>
);

export default AroundYou;
