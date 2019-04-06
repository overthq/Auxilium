import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Popup from './Popup';

const Main = createStackNavigator(
	{ Home, Popup },
	{
		headerMode: 'none',
		mode: 'modal',
		transparentCard: true
	}
);

export default Main;
