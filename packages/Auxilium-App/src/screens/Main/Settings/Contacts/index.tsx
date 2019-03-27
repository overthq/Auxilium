import { createStackNavigator } from 'react-navigation';

import ContactsList from './ContactsList';
import AddContact from './AddContact';

const Contacts = createStackNavigator(
	{
		ContactsList: { screen: ContactsList },
		AddContact: { screen: AddContact }
	},
	{
		headerMode: 'none',
		mode: 'modal'
	}
);

export default Contacts;
