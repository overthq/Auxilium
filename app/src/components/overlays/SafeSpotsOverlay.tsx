import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { Feather } from '@expo/vector-icons';
import OverlaySlide from '../OverlaySlide';
import { useAppSelector } from '../../../store';
import { deleteSafeSpot } from '../../redux/safe-spots/actions';
import { ModalsContext } from '../../contexts/ModalsContext';

const SafeSpotOverlay: React.FC = () => {
	const { safeSpots, theme } = useAppSelector(({ safeSpots, theme }) => ({
		safeSpots,
		theme
	}));
	const { openModal } = React.useContext(ModalsContext);
	const dispatch = useDispatch();

	return (
		<OverlaySlide
			title='Safe Spots'
			headerRight={
				<TouchableOpacity onPress={() => openModal('Add Safe Spot')}>
					<Feather name='plus-circle' color={theme.secondaryColor} size={24} />
				</TouchableOpacity>
			}
		>
			{safeSpots.safeSpots.map(spot => (
				<View style={{ flexDirection: 'row' }} key={spot._id}>
					<Text style={[styles.text, { color: theme.secondaryColor }]}>
						{spot.name}
					</Text>
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
		fontSize: 16
	}
});

export default SafeSpotOverlay;
