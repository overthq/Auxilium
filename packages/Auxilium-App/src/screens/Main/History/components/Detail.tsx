import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: 0.8 * width,
		borderRadius: 4,
		backgroundColor: '#D3D3D3'
	},
	text: {
		fontFamily: 'Muli Regular',
		fontSize: 16
	}
});

const Detail = ({ location: { coordinates } }: Emergency) => (
	<View style={styles.container}>
		<Text style={styles.text}>Longitude: {`${coordinates[0]}`}</Text>
		<Text style={styles.text}>Latitude: {`${coordinates[1]}`}</Text>
	</View>
);

export default Detail;
