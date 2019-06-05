import React from 'react';
import Svg, { Circle } from 'react-native-svg';

const CustomMarker = ({ size }: { size: number }) => (
	<Svg height={size} width={size}>
		<Circle
			cx={size / 2}
			cy={size / 2}
			r={size / 2}
			fill='rgba(241, 140, 140, 0.84)'
		/>
	</Svg>
);

export default CustomMarker;
