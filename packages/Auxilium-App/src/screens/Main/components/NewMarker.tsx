import React from 'react';
import { View } from 'react-native';

const NewMarker = ({ size }: { size: number }) => (
	<View
		style={{
			height: size,
			width: size,
			borderRadius: size / 2,
			backgroundColor: '#FF4D4D',
			borderWidth: 1,
			borderColor: '#000000'
		}}
	/>
);

export default NewMarker;
