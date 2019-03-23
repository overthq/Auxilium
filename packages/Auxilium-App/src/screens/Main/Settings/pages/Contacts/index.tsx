import React from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { Contacts } from 'expo';
import { Contact } from './components';

interface ContactsState {
	contacts: Contacts.ContactResponse;
	selectedContacts: Contacts.ContactResponse[];
}

class ContactsPage extends React.Component<{}, ContactsState> {
	state: ContactsState = {
		contacts: [],
		selectedContacts: []
	};

	loadContacts = async () => {
		const contacts = await Contacts.getContactsAsync();
		this.setState({ contacts });
	};

	render() {
		const { contacts, selectedContacts } = this.state;
		return (
			<SafeAreaView style={styles.container}>
				<FlatList
					data={contacts}
					renderItem={contact => <Contact {...{ contact }} />}
					keyExtractor={contact => contact.id}
				/>
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
