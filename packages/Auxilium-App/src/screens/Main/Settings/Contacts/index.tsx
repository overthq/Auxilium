import React from 'react';
import {
	SafeAreaView,
	FlatList,
	StyleSheet,
	TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Contact } from './components';
import { ThemeConsumer } from '../../../../context';

interface ContactsState {
	contacts: {
		name: string;
		phone: string;
	}[];
}

class ContactsPage extends React.Component<{}, ContactsState> {
	state: ContactsState = {
		contacts: []
	};

	loadContacts = async () => {
		// TODO: Fetch contacts from SQLite!
	};

	render() {
		const { contacts } = this.state;
		const { navigation } = this.props;
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<SafeAreaView
						style={[
							styles.container,
							{ backgroundColor: theme.backgroundColor }
						]}
					>
						<TouchableOpacity onPress={() => navigation.goBack()}>
							<Feather name='arrow-left' color={theme.textColor} size={26} />
						</TouchableOpacity>
						<FlatList
							data={contacts}
							renderItem={contact => <Contact {...{ contact }} />}
							keyExtractor={(_, index) => index.toString()}
						/>
					</SafeAreaView>
				)}
			</ThemeConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default ContactsPage;
