import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { useAppSelector } from '../../store';
import { getDistance } from '../helpers/location';

interface EmergencyDetailsProps {
	description?: string;
	longitude: number;
	latitude: number;
	createdAt: Date | string;
}

const EmergencyDetails: React.FC<EmergencyDetailsProps> = props => {
	const { description, longitude, latitude, createdAt } = props;
	const coordinates = useAppSelector(({ location }) => location.coordinates);
	const distance = getDistance(coordinates, { longitude, latitude });
	const formattedDate = formatDistanceToNow(new Date(createdAt), {
		addSuffix: true
	});

	return (
		<View style={styles.container}>
			{description && <Text style={styles.description}>{description}</Text>}
			<Text style={styles.location}>{`~${distance} · ${formattedDate}`}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		alignSelf: 'center',
		bottom: 0,
		backgroundColor: '#505050',
		padding: 10,
		width: '100%'
	},
	description: {
		color: '#D3D3D3',
		fontSize: 20,
		fontWeight: '500'
	},
	location: {
		color: '#a0a0a0',
		fontSize: 14
	}
});

export default EmergencyDetails;
