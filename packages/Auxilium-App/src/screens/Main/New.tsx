import React from 'react';
import { connect } from 'react-redux';
import { View, TouchableOpacity, Alert, Text } from 'react-native';
import firebase from 'firebase';
import { Firebase } from '../../config';
import locate from '../../redux/actions/Location';

interface NewState {
	location: {
		longitude: Number;
		latitude: Number;
	};
}

class New extends React.Component<{}, NewState> {
	help = async () => {
		const { locate, location } = this.props;
		try {
			await locate();
			const { uid } = Firebase.auth.currentUser;
			await Firebase.firestore
				.collection('emergencies')
				.doc()
				.set({
					uid,
					location: {
						latitude: location.coords.latitude,
						longitude: location.coords.longitude
					},
					timestamp: firebase.firestore.FieldValue.serverTimestamp()
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
