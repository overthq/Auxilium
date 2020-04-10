import React from 'react';
import { View } from 'react-native';
import { darken } from '../helpers/colors';

interface MarkerProps {
	size?: number;
	borderStroke?: number;
	color?: string;
}

const MapMarker: React.FC<MarkerProps> = ({
	size = 25,
	borderStroke,
	color
}) => (
	<View
		style={{
			height: size,
			width: size,
			borderRadius: size / 2,
			borderWidth: 2.5 || borderStroke,
			borderColor: darken(color || '#FF4D4D', -60),
			backgroundColor: color || '#FF4D4D'
		}}
	/>
);

export default MapMarker;
