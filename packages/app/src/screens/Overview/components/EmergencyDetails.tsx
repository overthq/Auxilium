import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';
import { getDistance } from '../../../helpers/location';

interface EmergencyDetailsProps {
	description?: string;
	longitude: number;
	latitude: number;
	createdAt: Date | string;
}

const selector = ({ location: { coordinates } }: RootState) => ({
	coordinates
});

const EmergencyDetails: React.FC<EmergencyDetailsProps> = props => {
	const { description, longitude, latitude, createdAt } = props;
	const { coordinates } = useSelector(selector);
	const distance = getDistance(coordinates, { longitude, latitude });

	return (
		<View style={styles.container}>
			<Text style={styles.description}>~{distance}</Text>
			<Text style={styles.description}>{description}</Text>
			<Text style={styles.location}>
				{new Date(createdAt).toLocaleDateString()}
			</Text>
			<Text style={styles.location}>
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
	description: {
		color: '#D3D3D3',
		fontSize: 20,
		fontFamily: 'Rubik Medium'
	},
	location: {
		color: '#a0a0a0',
		fontSize: 14,
		fontFamily: 'Rubik Regular'
	}
});

export default EmergencyDetails;
