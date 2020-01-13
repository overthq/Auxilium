import React from 'react';
import { TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

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
	<Svg height={size} width={size}>
		<Circle
			cx={size / 2}
			cy={size / 2}
			r={size / 2 - (1 || borderStroke) * 2}
			stroke='#000000'
			strokeWidth={2 || borderStroke}
			fill={color || '#FF4D4D'}
		/>
	</Svg>
);

export default MapMarker;
