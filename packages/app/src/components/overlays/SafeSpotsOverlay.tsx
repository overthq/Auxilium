import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import { OverlaySlide } from '../Overlay';
import { useAppSelector } from '../../../store';
import { deleteSafeSpot } from '../../redux/safe-spots/actions';

interface SafeSpotOverlayProps {
	modalRef: React.RefObject<Modalize>;
}

const SafeSpotOverlay: React.FC<SafeSpotOverlayProps> = ({ modalRef }) => {
	const { safeSpots, theme } = useAppSelector(({ safeSpots, theme }) => ({
		safeSpots,
		theme
	}));
	const dispatch = useDispatch();

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
				<View style={{ flexDirection: 'row' }} key={spot._id}>
					<Text style={styles.text}>{spot.name}</Text>
					<TouchableOpacity onPress={() => dispatch(deleteSafeSpot(spot._id))}>
						<Feather name='trash' color={theme.secondaryColor} size={24} />
					</TouchableOpacity>
					{/* onPress, use the centerOnCoords method to animate to the safe spot location */}
				</View>
			))}
		</OverlaySlide>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16,
		color: '#D3D3D3'
	}
});

export default SafeSpotOverlay;
