import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
	container: {
		height: 30,
		width: 0.8 * width,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text: {
		fontFamily: 'Muli Regular',
		fontSize: 16
	}
});

const getAddressFromCoords = async ({ longitude, latitude }: Coordinates) => {
	try {
		const response = await fetch(
			`http://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode?location=${longitude},${latitude}`
		);
		const data = await response.json();
		console.log(data);
	} catch (error) {
		Alert.alert(error.message);
	}
};

const Detail = ({ location: { coordinates } }: Emergency) => {
	const [longitude, latitude] = coordinates;
	getAddressFromCoords({ longitude, latitude });
	return (
		<View style={styles.container}>
			<Feather name='map-pin' color='#D3D3D3' size={16} />
			<Text style={styles.text}>Longitude: {`${longitude}`}</Text>
			<Text style={styles.text}>Latitude: {`${latitude}`}</Text>
		</View>
	);
};

export default Detail;
