import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { reportEmergency } from '../api/Emergencies';
import { useAppSelector } from '../../store';
import { ModalsContext } from '../contexts/ModalsContext';

const Report: React.FC = () => {
	const coordinates = useAppSelector(({ location }) => location.coordinates);
	const { openModal } = React.useContext(ModalsContext);
	const handlePress = () => reportEmergency(coordinates);
	const handleLongPress = () => openModal('Report Emergency');

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={styles.buttonContainer}
			onPress={handlePress}
			onLongPress={handleLongPress}
		>
			<View style={styles.buttonInner}>
				<Text style={styles.buttonText}>!</Text>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	buttonContainer: {
		width: 100,
		height: 100,
		borderRadius: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'rgba(255, 130, 130, 0.2)',
		marginHorizontal: 'auto',
		bottom: 20,
		position: 'absolute'
	},
	buttonInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF8282'
	},
	buttonText: {
		fontSize: 30,
		color: '#FFFFFF',
		fontWeight: 'bold'
	}
});

export default Report;
