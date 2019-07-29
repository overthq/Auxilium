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

const Popup = ({ navigation }: NavigationScreenProps) => {
	const [text, setText] = React.useState('');

	const onSubmit = async () => {
		const action = navigation.getParam('action');
		await action(text);
		navigation.pop();
	};

	return (
		<KeyboardAvoidingView style={styles.container} behavior='padding'>
			<TouchableWithoutFeedback onPress={() => navigation.pop()}>
				<View style={styles.container}>
					<View style={[styles.modal, { width, height: height / 2 }]}>
						<TouchableOpacity style={styles.button} onPress={onSubmit}>
							<Feather name='send' color='#FF8282' size={30} />
						</TouchableOpacity>
						<TextInput
							style={styles.textArea}
							onChangeText={value => setText(value)}
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
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'rgba(0, 0, 0, 0.5)',
		justifyContent: 'flex-end'
	},
	modal: {
		flexDirection: 'column',
		paddingTop: 20,
		paddingHorizontal: 20,
		backgroundColor: '#1C1C1C',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	},
	textArea: {
		height: height / 2 - 50,
		width: '100%',
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		color: '#D3D3D3'
	},
	button: {
		alignSelf: 'flex-end'
	}
});

export default Popup;
