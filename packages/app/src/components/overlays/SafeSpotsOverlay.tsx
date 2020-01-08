import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { OverlaySlide } from '../Overlay';
import { useAppSelector } from '../../../store';

const SafeSpotOverlay = () => {
	const safeSpots = useAppSelector(({ safeSpots }) => safeSpots);

	return (
		<OverlaySlide title='Safe Spots'>
			<TouchableOpacity>
				<Text>Add Spot</Text>
			</TouchableOpacity>
			{safeSpots.safeSpots.map(spot => (
				<View key={spot._id}>
					<Text>{spot.name}</Text>
					{/* onPress, we want the background map to get focused. Still have to create a context to handle the map state. */}
				</View>
			))}
		</OverlaySlide>
	);
};

export default SafeSpotOverlay;
