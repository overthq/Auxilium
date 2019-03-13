import React from 'react';
import { Constants } from 'expo';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import locate from '../../redux/actions/Location';
import env from '../../../env';

interface NewState {
	location: {
		longitude: Number;
		latitude: Number;
	};
}

class New extends React.Component<{ locate: any; location: any }, NewState> {
	socket = io(env.apiUrl);

	help = async () => {
		const {
			locate,
			location: { coordinates }
		} = this.props;
		try {
			await locate();
			console.log('This is the connection status:', this.socket.connected);
			this.socket.emit('emergency', {
				deviceId: Constants.deviceId,
				location: {
					type: 'Point',
					coordinates: [coordinates.longitude, coordinates.latitude]
				}
			});
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	render(): React.ReactNode {
		return (
			<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
				<TouchableOpacity onPress={this.help}>
					<Text>Help!</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const mapStateToProps = ({ location }: { location: any }) => ({ location });
const mapDispatchToProps = { locate };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(New);
