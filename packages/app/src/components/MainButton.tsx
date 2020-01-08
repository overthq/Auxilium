import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainButton: React.FC<{ onPress(): void }> = ({ onPress }) => (
	<TouchableOpacity {...{ onPress }}>
		<View style={styles.button} />
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		marginHorizontal: 'auto',
		bottom: 20
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: 'rgba(255, 130, 130, 0.2)'
	}
});

export default MainButton;
