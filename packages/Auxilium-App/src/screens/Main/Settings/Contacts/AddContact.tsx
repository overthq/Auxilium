import React from 'react';
import {
	View,
	Text,
	// SafeAreaView,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	TouchableWithoutFeedback,
	Dimensions,
	KeyboardAvoidingView,
	Keyboard
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';
import { ThemeConsumer } from '../../../../context';

interface AddContactProps extends NavigationScreenProps {}

type SubmitFunction = (name: string, phone: string) => void;

interface AddContactState {
	name: string;
	phone: string;
}

const { width } = Dimensions.get('window');

class AddContact extends React.Component<AddContactProps, AddContactState> {
	state: AddContactState = {
		name: '',
		phone: ''
	};

	handleSubmit = (): void => {
		const { name, phone } = this.state;
		const { navigation } = this.props;
		const onSubmit: SubmitFunction = navigation.getParam('onSubmit');
		console.log(onSubmit(name, phone));
		return onSubmit(name, phone);
	};

	render() {
		const { navigation } = this.props;
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
						<KeyboardAvoidingView
							behavior='padding'
							style={[
								styles.container,
								{ backgroundColor: theme.backgroundColor }
							]}
						>
							<TouchableOpacity
								onPress={() => navigation.goBack()}
								style={styles.backButton}
							>
								<Feather name='x' size={30} color={theme.textColor} />
							</TouchableOpacity>
							<TextInput
								style={[styles.input, { color: theme.textColor }]}
								onChangeText={name => this.setState({ name })}
								placeholder={`Contact's name`}
								placeholderTextColor={theme.textColor}
							/>
							<TextInput
								style={[styles.input, { color: theme.textColor }]}
								onChangeText={phone => this.setState({ phone })}
								placeholder={`Contact's phone number`}
								placeholderTextColor={theme.textColor}
							/>
							<TouchableOpacity onPress={this.handleSubmit}>
								<View
									style={[styles.button, { backgroundColor: theme.textColor }]}
								>
									<Text
										style={[
											styles.buttonText,
											{ color: theme.backgroundColor }
										]}
									>
										Add Contact
									</Text>
								</View>
							</TouchableOpacity>
						</KeyboardAvoidingView>
					</TouchableWithoutFeedback>
				)}
			</ThemeConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	},
	button: {
		height: 45,
		width: width <= 320 ? 300 : width < 375 ? 350 : 400,
		borderRadius: 5,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	buttonText: {
		fontFamily: 'Muli SemiBold',
		fontSize: 16
	},
	backButton: {
		position: 'absolute',
		top: 35,
		left: 10
	},
	input: {
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		height: 45,
		borderRadius: 4,
		fontFamily: 'Muli Regular',
		fontSize: 16,
		width: width <= 320 ? 300 : width < 375 ? 350 : 400,
		marginBottom: 20,
		paddingLeft: 10
	}
});

export default AddContact;
