import React from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Alert,
	StyleSheet,
	FlatList,
	Animated
} from 'react-native';
// eslint-disable-next-line
import { NavigationScreenProps } from 'react-navigation';
import { Auth } from '../../api';
import Slide from './Slide';
import slides from './slides';
import { Pagination } from './components';

const { width, height } = Dimensions.get('window');

interface OnboardingProps extends NavigationScreenProps {}

const Onboarding = (props: OnboardingProps) => {
	const scrollX = new Animated.Value(0);

	const authenticateUser = async () => {
		const {
			navigation: { navigate }
		} = props;
		try {
			await Auth.authenticate();
			return navigate('Main');
		} catch (error) {
			return Alert.alert(error.message);
		}
	};

  return (
		<View style={styles.screen}>
			<FlatList
				data={slides}
				keyExtractor={item => item.id.toString()}
				renderItem={({ item, index }) => <Slide key={index} {...item} />}
				horizontal
				contentContainerStyle={{ height: 0.8 * height }}
				showsHorizontalScrollIndicator={false}
				snapToInterval={width}
				snapToAlignment='center'
				decelerationRate={0}
				pagingEnabled
				onScroll={Animated.event([
					{
						nativeEvent: { contentOffset: { x: scrollX } }
					}
				])}
			/>
			<Pagination {...{ tabs: slides, scrollX }} />
			<TouchableOpacity style={styles.button} onPress={authenticateUser}>
				<Text style={styles.buttonText}>Get Started</Text>
			</TouchableOpacity>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#1C1C1C'
	},
	button: {
		height: 50,
		width: 0.8 * width,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 25,
		backgroundColor: '#FF8282',
		marginBottom: 20
	},
	buttonText: {
		color: '#FFFFFF',
		fontFamily: 'Rubik Medium',
		fontSize: 20
	}
});

export default Onboarding;
