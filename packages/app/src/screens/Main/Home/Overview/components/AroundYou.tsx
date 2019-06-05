import React from 'react';
import HistoryItem from './HistoryItem';

interface AroundYouProps {
	emergencies: Emergency[];
	navigate(emergency: Emergency): void;
}

const AroundYou = ({ emergencies, navigate }: AroundYouProps) => (
	<>
		{emergencies.map((item, index) => (
			<HistoryItem key={index} onPress={() => navigate(item)} {...item} />
		))}
	</>
);

export default AroundYou;
