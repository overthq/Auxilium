import React from 'react';
import Svg, { Circle } from 'react-native-svg';

interface MarkerProps {
	size: number;
	borderStroke?: number;
}

const MapMarker = ({ size, borderStroke }: MarkerProps) => (
	<Svg height={size} width={size}>
		<Circle
			cx={size / 2}
			cy={size / 2}
			r={size / 2 - (1 || borderStroke) * 2}
			stroke='#000000'
			strokeWidth={1 || borderStroke}
			fill='#FF4D4D'
		/>
	</Svg>
);

export default MapMarker;
