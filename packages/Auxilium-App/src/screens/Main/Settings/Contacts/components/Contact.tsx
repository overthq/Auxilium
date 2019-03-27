import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ThemeConsumer } from '../../../../../context';

const Contact = ({ name, phone }: { name: string; phone: string }) => (
	<ThemeConsumer>
		{({ theme }) => (
			<View style={styles.container}>
				<Text style={[styles.contactName, { color: theme.textColor }]}>
					{name}
				</Text>
				<Text>{phone}</Text>
			</View>
		)}
	</ThemeConsumer>
);

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	contactName: {
		fontSize: 16,
		fontFamily: 'Muli Regular'
	},
	phone: {
		fontSize: 14,
		fontFamily: 'Muli Regular'
	}
});

export default Contact;
