import { createStackNavigator } from 'react-navigation';
import MainSettings from './MainSettings';
import Contacts from './Contacts';

const Settings = createStackNavigator(
	{
		MainSettings: {
			screen: MainSettings
		},
		Contacts: { screen: Contacts }
	},
	{
		headerMode: 'none'
	}
);

export default Settings;
