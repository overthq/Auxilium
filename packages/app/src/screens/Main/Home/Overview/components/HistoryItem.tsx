import React from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { LocationHelpers } from '../../../../../helpers';

const { width } = Dimensions.get('window');

interface HistoryItemProps extends Emergency {
	onPress(): void;
	createdAt: Date;
}

class HistoryItem extends React.Component<
	HistoryItemProps,
	{ address: string }
> {
	state = {
		address: ''
	};

	async componentDidMount() {
		const {
			location: {
				coordinates: [longitude, latitude]
			}
		} = this.props;
		const address = await LocationHelpers.getAddressFromCoords({
			longitude,
			latitude
		});
		this.setState({ address });
	}

	render() {
		const { address } = this.state;
		const { description, createdAt, onPress } = this.props;
		return (
			<TouchableOpacity activeOpacity={0.6} {...{ onPress }}>
				<View style={styles.historySection}>
					<View style={styles.headerRow}>
						<Feather name='navigation' size={16} color='#D3D3D3' />
						<Text style={styles.locationText}>{address}</Text>
					</View>
					<Text style={styles.descriptionText}>{description}</Text>
					<Text>{createdAt}</Text>
				</View>
			</TouchableOpacity>
		);
	}
}

const styles = StyleSheet.create({
	historySection: {
		borderRadius: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		width: 0.9 * width,
		height: 65,
		padding: 10,
		marginBottom: 10
	},
	headerRow: {
		display: 'flex',
		flexDirection: 'row',
		marginBottom: 10
	},
	locationText: {
		fontFamily: 'Rubik Regular',
		textTransform: 'uppercase',
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
