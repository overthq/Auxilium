import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Onboarding from './Onboarding';
import Main from './Main';
import Loading from './Loading';
// import Old from './Old';

export default createAppContainer(
	createSwitchNavigator(
		{ Loading, Onboarding, Main },
		{
			initialRouteName: 'Loading',
			backBehavior: 'none'
		}
	)
);

export { default as NavigationService } from './NavigationService';
