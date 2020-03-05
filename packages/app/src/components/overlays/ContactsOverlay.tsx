import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { OverlaySlide } from '../Overlay';
import { useAppSelector } from '../../../store';

const ContactsOverlay = () => {
	const theme = useAppSelector(({ theme }) => theme);

	return (
		<OverlaySlide title='Contacts'>
			<Text style={[styles.text, { color: theme.secondaryColor }]}>
				This feature is not in development yet. It involves saving close
				contacts to SQLite, so we can send them a text message whenever users
				are in an emergency. Feel free to open a PR to implement this.
			</Text>
		</OverlaySlide>
	);
};

const styles = StyleSheet.create({
	text: {
		fontSize: 16
	}
});

export default ContactsOverlay;
