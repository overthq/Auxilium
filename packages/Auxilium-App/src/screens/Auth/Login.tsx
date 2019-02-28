import React from 'react';
import {
	View,
	TextInput,
	TouchableOpacity,
	Text,
	Alert,
	KeyboardAvoidingView
} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Firebase } from '../../config';
import styles from './styles';

const validationSchema = yup.object().shape({
	email: yup
		.string()
		.required()
		.email()
		.label('Email'),
	password: yup
		.string()
		.required()
		.min(8)
		.label('Password')
});

const Login = ({ navigation }: any) => {
	return (
		<Formik
			{...{ validationSchema }}
			initialValues={{ email: '', password: '' }}
			onSubmit={async ({ email, password }, { setSubmitting }) => {
				try {
					await Firebase.auth.signInWithEmailAndPassword(email, password);
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
						Login
					</Text>
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
							<Text
								style={{
									fontSize: 18,
									color: '#FFFFFF',
									fontFamily: 'Muli SemiBold'
								}}
							>
								Login
							</Text>
						</View>
					</TouchableOpacity>
				</KeyboardAvoidingView>
			)}
		</Formik>
	);
};

export default Login;
