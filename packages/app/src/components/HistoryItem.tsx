import React from 'react';
import { Text, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { getDistance } from '../helpers/location';
import { useAppSelector } from '../../store';

const { width } = Dimensions.get('window');

interface HistoryItemProps extends Emergency {
	action(): void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
	action,
	description,
	location: {
		coordinates: [longitude, latitude]
	},
	createdAt
}) => {
	const coordinates = useAppSelector(({ location }) => location.coordinates);
	const distance = getDistance(coordinates, { longitude, latitude });
	const formattedDate = formatDistanceToNow(new Date(createdAt), {
		addSuffix: true
	});

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={action}
			style={styles.container}
		>
			<Text style={styles.location}>{`~${distance} · ${formattedDate}`}</Text>
			<Text style={styles.description}>{description}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 6,
		backgroundColor: '#404040',
		width: 0.9 * width,
		height: 65,
		padding: 10,
		marginBottom: 10
	},
	location: {
		letterSpacing: 1,
		color: '#777777',
		marginBottom: 10
	},
	description: {
		color: '#D3D3D3',
		fontSize: 14
	}
});

export default HistoryItem;
