import { createStackNavigator } from 'react-navigation';
import Login from './Login';
import Register from './Register';
import Welcome from './Welcome';

export default createStackNavigator(
	{
		Welcome: { screen: Welcome },
		Login: { screen: Login },
		Register: { screen: Register }
	},
	{
		headerMode: 'none'
	}
);
