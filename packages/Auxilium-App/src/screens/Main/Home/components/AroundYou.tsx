import React from 'react';
import HistoryItem from './HistoryItem';

const AroundYou = ({ emergencies }: { emergencies: Emergency[] }) => (
	<>
		{emergencies.slice(0, 5).map((item, index) => (
			<HistoryItem key={index} {...item} />
		))}
	</>
);

export default AroundYou;
