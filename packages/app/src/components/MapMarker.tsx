import React from 'react';
import { TouchableOpacity } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

interface MarkerProps {
	size: number;
	borderStroke?: number;
	color?: string;
	onPress?: () => void;
}

const MapMarker: React.FC<MarkerProps> = ({
	size,
	borderStroke,
	color,
	onPress
}) => {
	const MainMarker = (
		<Svg height={size} width={size}>
			<Circle
				cx={size / 2}
				cy={size / 2}
				r={size / 2 - (1 || borderStroke) * 2}
				stroke='#000000'
				strokeWidth={1 || borderStroke}
				fill={color || '#FF4D4D'}
			/>
		</Svg>
	);

	return onPress ? (
		<TouchableOpacity {...{ onPress }}>{MainMarker}</TouchableOpacity>
	) : (
		MainMarker
	);
};

export default MapMarker;
