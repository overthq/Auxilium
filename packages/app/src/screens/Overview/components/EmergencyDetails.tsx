import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface EmergencyDetailsProps {
	description?: string;
	address: string;
	longitude: number;
	latitude: number;
	createdAt: Date | string;
}

const EmergencyDetails = (props: EmergencyDetailsProps) => {
	const { description, address, longitude, latitude, createdAt } = props;
	return (
		<View style={styles.container}>
			<Text style={styles.emergencyDescription}>{description}</Text>
			<Text style={styles.emergencyAddress}>{address}</Text>
			<Text style={styles.emergencyLongLat}>
				{new Date(createdAt).toLocaleDateString()}
			</Text>
			<Text style={styles.emergencyLongLat}>
				{`${longitude.toFixed(4)}, ${latitude.toFixed(4)}`}
			</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 20,
		backgroundColor: '#505050',
		borderRadius: 6,
		padding: 10,
		width: '90%'
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

export default EmergencyDetails;
