import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const MainButton = ({ onPress }: { onPress(): void }) => (
	<TouchableOpacity style={styles.buttonHolder} {...{ onPress }}>
		<View style={styles.button}>
			<View style={styles.buttonInner}>
				<Text style={styles.buttonText}>!</Text>
			</View>
		</View>
	</TouchableOpacity>
);

const styles = {
	buttonHolder: {
		position: 'absolute' as 'absolute',
		marginHorizontal: 'auto',
		bottom: 20
	},
	button: {
		display: 'flex' as 'flex',
		alignItems: 'center' as 'center',
		justifyContent: 'center' as 'center',
		width: 100,
		height: 100,
		borderRadius: 50,
		backgroundColor: 'rgba(255, 130, 130, 0.2)'
	},
	buttonInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
		display: 'flex' as 'flex',
		alignItems: 'center' as 'center',
		justifyContent: 'center' as 'center',
		backgroundColor: '#FF8282'
	},
	buttonText: {
		fontSize: 30,
		color: '#FFFFFF',
		fontWeight: 'bold' as 'bold'
	}
};

export default MainButton;
