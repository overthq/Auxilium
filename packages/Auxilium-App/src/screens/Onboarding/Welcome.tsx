import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Dimensions,
	StyleSheet
} from 'react-native';
import styles from './styles';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;
const style = StyleSheet.create({
	buttonText: {
		fontSize: 18,
		fontFamily: 'Muli SemiBold'
	}
});

const Welcome = ({ navigation }: { navigation: any }) => (
	<>
		<View
			style={{
				height: 0.7 * height,
				width,
				backgroundColor: '#FF8282',
				alignItems: 'center',
				justifyContent: 'center'
			}}
		>
			<Text
				style={{
					color: 'rgba(0,0,0,0.7)',
					fontFamily: 'Muli SemiBold',
					fontSize: aspectRatio * 64
				}}
			>
				Auxilium
			</Text>
		</View>
		<View
			style={{
				height: 0.3 * height,
				width,
				alignItems: 'center',
				justifyContent: 'space-around',
				backgroundColor: '#FFFFFF',
				paddingVertical: 10
			}}
		>
			<TouchableOpacity onPress={() => navigation.navigate('Login')}>
				<View style={styles.button}>
					<Text style={[style.buttonText, { color: '#FFFFFF' }]}>Login</Text>
				</View>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => navigation.navigate('Register')}>
				<View style={[styles.button, { backgroundColor: '#D3D3D3' }]}>
					<Text style={[style.buttonText, { color: '#505050' }]}>Register</Text>
				</View>
			</TouchableOpacity>
		</View>
	</>
);

export default Welcome;
