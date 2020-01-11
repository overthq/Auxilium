import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';
import { OverlaySlide } from '../Overlay';
import { useAppSelector } from '../../../store';

interface SafeSpotOverlayProps {
	modalRef: React.RefObject<Modalize>;
}

const SafeSpotOverlay: React.FC<SafeSpotOverlayProps> = ({ modalRef }) => {
	const safeSpots = useAppSelector(({ safeSpots }) => safeSpots);

	return (
		<OverlaySlide
			title='Safe Spots'
			headerRight={
				<TouchableOpacity onPress={modalRef.current?.open}>
					<Feather name='plus-circle' color='#D3D3D3' size={24} />
				</TouchableOpacity>
			}
		>
			{safeSpots.safeSpots.map(spot => (
				<View key={spot._id}>
					<Text>{spot.name}</Text>
					{/* onPress, use the centerOnCoords method to animate to the safe spot location */}
				</View>
			))}
		</OverlaySlide>
	);
};

export default SafeSpotOverlay;
