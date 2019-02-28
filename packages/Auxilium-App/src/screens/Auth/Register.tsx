import React from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import {
	TextInput,
	Alert,
	View,
	TouchableOpacity,
	Text,
	KeyboardAvoidingView
} from 'react-native';
import { Firebase } from '../../config';
import styles from './styles';

const validationSchema = yup.object().shape({
	name: yup
		.string()
		.required()
		.label('Name'),
	email: yup
		.string()
		.required()
		.label('Email')
		.email(),
	password: yup
		.string()
		.required()
		.label('Password')
		.min(8)
});

const Register = ({ navigation }) => (
	<Formik
		{...{ validationSchema }}
		initialValues={{ name: '', email: '', password: '' }}
		onSubmit={async ({ name, email, password }, { setSubmitting }) => {
			try {
				await Firebase.auth.createUserWithEmailAndPassword(email, password);
				await Firebase.auth.currentUser.updateProfile({
					displayName: name,
					photoURL: ''
				});
				navigation.navigate('Main');
			} catch (error) {
				Alert.alert(error.message);
			} finally {
				setSubmitting(false);
			}
		}}
	>
		{({ handleChange, handleBlur, handleSubmit }) => (
			<KeyboardAvoidingView
				style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
				behavior='padding'
			>
				<Text
					style={{
						fontFamily: 'Muli SemiBold',
						fontSize: 35,
						marginBottom: 20
					}}
				>
					Register
				</Text>
				<TextInput
					style={styles.input}
					placeholder='Your name'
					placeholderTextColor='#505050'
					onChangeText={handleChange('name')}
					onBlur={handleBlur('name')}
				/>
				<TextInput
					style={styles.input}
					placeholder='Your email'
					placeholderTextColor='#505050'
					onChangeText={handleChange('email')}
					onBlur={handleBlur('email')}
				/>
				<TextInput
					style={styles.input}
					placeholder='Your password'
					placeholderTextColor='#505050'
					onChangeText={handleChange('password')}
					onBlur={handleBlur('password')}
					secureTextEntry
				/>
				<TouchableOpacity onPress={handleSubmit}>
					<View style={styles.button}>
						<Text style={{ fontSize: 16, color: '#FFFFFF' }}>Register</Text>
					</View>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		)}
	</Formik>
);

export default Register;
