import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { getDistance } from '../helpers/location';
import { useAppSelector } from '../../store';

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
	const { coordinates, theme } = useAppSelector(({ location, theme }) => ({
		coordinates: location.coordinates,
		theme
	}));
	const distance = getDistance(coordinates, { longitude, latitude });
	const formattedDate = formatDistanceToNow(new Date(createdAt), {
		addSuffix: true
	});

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			onPress={action}
			style={[
				styles.container,
				{ backgroundColor: theme.name === 'dark' ? '#404040' : '#606060' }
			]}
		>
			{description && <Text style={styles.description}>{description}</Text>}
			<Text
				style={[
					styles.location,
					{
						marginTop: description ? 5 : 0,
						color: theme.name === 'dark' ? '#777777' : '#999999'
					}
				]}
			>{`~${distance} · ${formattedDate}`}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		borderRadius: 6,
		backgroundColor: '#404040',
		width: '100%',
		padding: 10,
		marginBottom: 10
	},
	location: {
		letterSpacing: 0.2,
		color: '#777777'
	},
	description: {
		color: '#D3D3D3',
		letterSpacing: 0.2,
		fontSize: 16,
		fontWeight: '500'
	}
});

export default HistoryItem;
