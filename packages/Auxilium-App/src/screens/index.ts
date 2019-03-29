import { createAppContainer, createStackNavigator } from 'react-navigation';
import Onboarding from './Onboarding';
import Main from './Main';

export default createAppContainer(
	createStackNavigator(
		{
			Onboarding: { screen: Onboarding },
			Main: { screen: Main }
		},
		{
			headerMode: 'none',
			defaultNavigationOptions: {
        gesturesEnabled: false
			}
		}
	)
);

export { default as NavigationService } from './NavigationService';
