import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
	Dimensions
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeConsumer } from '../../../../../context';

const { width } = Dimensions.get('window');

interface ContactProps {
	name: string;
	phone: string;
	deleteContact: (name: string) => void;
}

const Contact = ({ name, phone, deleteContact }: ContactProps) => (
	<ThemeConsumer>
		{({ theme }) => (
			<View style={styles.container}>
				<View>
					<Text style={[styles.name, { color: theme.textColor }]}>{name}</Text>
					<Text style={[styles.phone, { color: theme.textColor }]}>
						{phone}
					</Text>
				</View>
				<View>
					<TouchableOpacity onPress={() => deleteContact(name)}>
						<Feather name='trash-2' size={26} color={theme.textColor} />
					</TouchableOpacity>
				</View>
			</View>
		)}
	</ThemeConsumer>
);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 100,
		width: width <= 320 ? 300 : width < 375 ? 350 : 400
	},
	name: {
		fontSize: 16,
		fontFamily: 'Rubik Regular'
	},
	phone: {
		fontSize: 14,
		fontFamily: 'Rubik Regular'
	}
});

export default Contact;
