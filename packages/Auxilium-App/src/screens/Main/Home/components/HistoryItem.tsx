import React from 'react';
import { View, Text, Dimensions } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { getAddressFromCoords } from '../../helpers/location';

const { width } = Dimensions.get('window');

class HistoryItem extends React.Component<{}, { address: string }> {
	state = {
		address: ''
	};

	async componentDidMount() {
		const {
			location: {
				coordinates: [longitude, latitude]
			}
		} = this.props;
		const address = await getAddressFromCoords({ longitude, latitude });
		this.setState({ address });
	}

	render() {
		const { address } = this.state;
		const { description } = this.props;
		return (
			<View style={styles.historySection}>
				<View style={styles.headerRow}>
					<Feather name='navigation' size={16} color='#D3D3D3' />
					<Text style={styles.locationText}>{address}</Text>
				</View>
				<Text style={styles.descriptionText}>{description}</Text>
			</View>
		);
	}
}

const styles = {
	historySection: {
		borderRadius: 6,
		backgroundColor: 'rgba(255, 255, 255, 0.05)',
		width: 0.9 * width,
		height: 65,
		padding: 10,
		marginBottom: 10
	},
	headerRow: {
		display: 'flex' as 'flex',
		flexDirection: 'row' as 'row',
		marginBottom: 10
	},
	locationText: {
		fontFamily: 'Rubik Regular',
		textTransform: 'uppercase' as 'uppercase',
		letterSpacing: 1,
		color: '#D3D3D3',
		marginLeft: 6
	},
	descriptionText: {
		color: '#777777',
		fontSize: 14
	}
};

export default HistoryItem;
