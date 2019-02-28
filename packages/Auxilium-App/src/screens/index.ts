import { createAppContainer, createStackNavigator } from 'react-navigation';
import Auth from './Auth';
import Main from './Main';

export default createAppContainer(
	createStackNavigator(
		{
			Auth: { screen: Auth },
			Main: { screen: Main }
		},
		{
			headerMode: 'none',
			navigationOptions: {
				gesturesEnabled: false
			}
		}
	)
);

export { default as NavigationService } from './NavigationService';
