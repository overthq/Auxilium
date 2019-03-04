import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import locate from '../../redux/actions/Location';
import { Emergencies } from '../../api';

interface NewState {
	location: {
		longitude: Number;
		latitude: Number;
	};
}

class New extends React.Component<{}, NewState> {
	help = async () => {
		const {
			locate,
			location: { coords }
		} = this.props;
		try {
			await locate();
			await Emergencies.createEmergency(coords);
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
