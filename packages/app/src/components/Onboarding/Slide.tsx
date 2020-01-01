import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface SlideProps {
	title: string;
	description: string;
}

const Slide: React.FC<SlideProps> = ({ title, description }) => (
	<View style={styles.container}>
		<Text style={styles.title}>{title}</Text>
		<Text style={styles.description}>{description}</Text>
	</View>
);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 20,
		width
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 25,
		marginBottom: 10,
		color: '#FFFFFF'
	},
	description: {
		fontFamily: 'Rubik Regular',
		fontSize: 17.5,
		color: '#FFFFFF',
		textAlign: 'center'
	}
});

export default Slide;
