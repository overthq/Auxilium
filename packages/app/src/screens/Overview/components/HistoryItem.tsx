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

const { width } = Dimensions.get('window');

interface HistoryItemProps extends Emergency {
	onPress(): void;
}

const HistoryItem: React.FC<HistoryItemProps> = ({
	onPress,
	description,
	address,
	createdAt
}) => (
	<TouchableOpacity activeOpacity={0.6} {...{ onPress }}>
		<View style={styles.historySection}>
			<View style={styles.headerRow}>
				<MaterialIcons name='near-me' size={14} color='#D3D3D3' />
				<Text style={styles.locationText}>
					{`${address} · ${formatDistanceToNow(new Date(createdAt), {
						addSuffix: true
					})}`}
				</Text>
			</View>
			<Text style={styles.descriptionText}>{description}</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	historySection: {
		borderRadius: 6,
		backgroundColor: '#404040',
		width: 0.9 * width,
		height: 65,
		padding: 10,
		marginBottom: 10
	},
	headerRow: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 10
	},
	locationText: {
		letterSpacing: 1,
		color: '#D3D3D3',
		marginLeft: 6
	},
	descriptionText: {
		color: '#777777',
		fontSize: 14
	}
});

export default HistoryItem;
