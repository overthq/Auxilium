import { createStackNavigator } from 'react-navigation';
import Overview from './Overview';
import EmergencyDetails from './EmergencyDetails';

const Home = createStackNavigator(
	{ Overview, EmergencyDetails },
	{
		headerMode: 'none'
	}
);

export default Home;
