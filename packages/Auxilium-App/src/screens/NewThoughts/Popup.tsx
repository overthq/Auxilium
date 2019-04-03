import React from 'react';
import {
	View,
	KeyboardAvoidingView,
	Keyboard,
	TouchableWithoutFeedback,
	TextInput,
	StyleSheet,
	Dimensions,
	TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';

const { width, height } = Dimensions.get('window');

export default class Popup extends React.Component<
	NavigationScreenProps,
	{ text: string }
> {
	state = {
		text: ''
	};

	onSubmit = () => {
		const { navigation } = this.props;
		const action = navigation.getParam('action');
		const { text } = this.state;
		action(text);
		navigation.pop();
	};

	render() {
		const { navigation } = this.props;
		return (
			<KeyboardAvoidingView style={styles.container} behavior='padding'>
				<TouchableWithoutFeedback onPress={() => navigation.pop()}>
					<View style={styles.container}>
						<View style={[styles.modal, { width, height: height / 2 }]}>
							<TouchableOpacity style={styles.button} onPress={this.onSubmit}>
								<Feather name='send' color='#FF8282' size={30} />
							</TouchableOpacity>
							<TextInput
								style={styles.textArea}
								onChange={text => this.setState({ text })}
								placeholder='What went wrong?'
								placeholderTextColor='#777777'
								multiline
								onBlur={Keyboard.dismiss}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end'
	},
	modal: {
		flexDirection: 'column',
		paddingVertical: 40,
		paddingHorizontal: 20,
		backgroundColor: '#1C1C1C',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	textArea: {
		height: '100%',
		width: '100%',
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		color: '#D3D3D3'
	},
	button: {
		alignSelf: 'flex-end'
	}
});
