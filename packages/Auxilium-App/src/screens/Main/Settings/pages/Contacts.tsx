import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';
import { Contacts } from 'expo';

class ContactsPage extends React.Component {
	state = {
		contacts: [],
		selectedContacts: []
	};

	loadContacts = async () => {
		const contacts = await Contacts.getContactsAsync();
		console.log(contacts);
		this.setState({ contacts });
	};

	render() {
		const { contacts, selectedContacts } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<ScrollView />
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default ContactsPage;
