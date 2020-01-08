import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MainButton: React.FC<{ onPress(): void }> = ({ onPress }) => (
	<TouchableOpacity style={styles.container} {...{ onPress }}>
		<View style={styles.button}>
			<View style={styles.buttonInner}>
				<Text style={styles.buttonText}>!</Text>
			</View>
		</View>
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

export default MainButton;
