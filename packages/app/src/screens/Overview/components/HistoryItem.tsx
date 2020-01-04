import React from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { MaterialIcons } from '@expo/vector-icons';
import { getDistance } from '../../../helpers/location';
import { RootState } from '../../../../store';
import { useSelector } from 'react-redux';

const { width } = Dimensions.get('window');

interface HistoryItemProps extends Emergency {
	action(): void;
}

const selector = ({ location: { coordinates } }: RootState) => ({
	coordinates
});

const HistoryItem: React.FC<HistoryItemProps> = ({
	action,
	description,
	location: {
		coordinates: [longitude, latitude]
	},
	createdAt
}) => {
	const { coordinates } = useSelector(selector);
	const distance = getDistance(coordinates, { longitude, latitude });

	return (
		<TouchableOpacity activeOpacity={0.6} onPress={action}>
			<View style={styles.container}>
				<View style={styles.header}>
					<MaterialIcons name='near-me' size={14} color='#D3D3D3' />
					<Text style={styles.location}>
						{`~${distance} · ${formatDistanceToNow(new Date(createdAt), {
							addSuffix: true
						})}`}
					</Text>
				</View>
				<Text style={styles.description}>{description}</Text>
			</View>
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
	header: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10
	},
	location: {
		letterSpacing: 1,
		color: '#D3D3D3',
		marginLeft: 6
	},
	description: {
		color: '#777777',
		fontSize: 14
	}
});

export default HistoryItem;
