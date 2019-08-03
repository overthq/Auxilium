import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

interface ExpandableDetailsProps {
	description?: string;
	address: string;
	longitude: number;
	latitude: number;
}

const ExpandableDetails = (props: ExpandableDetailsProps) => {
	const { description, address, longitude, latitude } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.emergencyDescription}>{description}</Text>
			<Text style={styles.emergencyAddress}>{address}</Text>
			<Text style={styles.emergencyLongLat}>
				{`${longitude.toFixed(4)}, ${latitude.toFixed(4)}`}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#505050',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 20,
		height: height / 4,
		width: '100%'
	},
	emergencyDescription: {
		color: '#D3D3D3',
		fontSize: 20,
		fontFamily: 'Rubik Medium'
	},
	emergencyAddress: {
		fontSize: 18,
		color: '#D3D3D3',
		fontFamily: 'Rubik Regular',
		marginVertical: 5
	},
	emergencyLongLat: {
		color: '#a0a0a0',
		fontSize: 14,
		fontFamily: 'Rubik Regular'
	}
});

export default ExpandableDetails;
