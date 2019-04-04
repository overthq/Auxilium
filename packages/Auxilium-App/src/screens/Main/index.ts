import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Popup from './Popup';

const HomeNav = createStackNavigator(
	{ Home, Popup },
	{
		headerMode: 'none',
		mode: 'modal',
		transparentCard: true
	}
);

export default HomeNav;
