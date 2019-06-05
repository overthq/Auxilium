import { Animated, Easing } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import Home from './Home';
import Popup from './Popup';

const Main = createStackNavigator(
	{ Home, Popup },
	{
		headerMode: 'none',
		mode: 'modal',
		transparentCard: true,
		transitionConfig: () => ({
			transitionSpec: {
				duration: 300,
				easing: Easing.inOut(Easing.ease),
				timing: Animated.timing
			},
			screenInterpolator: sceneProps => {
				const { position, scene } = sceneProps;
				const { index } = scene;

				const opacity = position.interpolate({
					inputRange: [index - 1, index],
					outputRange: [0, 1]
				});

				return { opacity };
			}
		})
	}
);

export default Main;
