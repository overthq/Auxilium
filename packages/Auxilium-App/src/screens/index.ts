import { createAppContainer, createStackNavigator } from 'react-navigation';
import Onboarding from './Onboarding';
import Main from './Main';
import NewThoughts from './NewThoughts';

export default createAppContainer(
	createStackNavigator(
		{ Onboarding, NewThoughts, Main },
		{
			headerMode: 'none',
			defaultNavigationOptions: {
				gesturesEnabled: false
			}
		}
	)
);

export { default as NavigationService } from './NavigationService';
