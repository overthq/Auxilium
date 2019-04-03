import { createAppContainer, createStackNavigator } from 'react-navigation';
import Onboarding from './Onboarding';
import NewThoughts from './NewThoughts';
// import Main from './Main';

export default createAppContainer(
	createStackNavigator(
		{ Onboarding, NewThoughts },
		{
			headerMode: 'none',
			defaultNavigationOptions: {
				gesturesEnabled: false
			}
		}
	)
);

export { default as NavigationService } from './NavigationService';
