import React from 'react';
import {
	View,
	Text,
	Dimensions,
	TouchableOpacity,
	Alert,
	StyleSheet
} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import { Auth } from '../../api';
/* eslint-disable-next-line */
import Slide, { SlideProps } from './Slide';
import slides from './slides';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between'
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
		fontFamily: 'Muli SemiBold',
		fontSize: 20
	}
});

class Onboarding extends React.Component {
	state = {
		currentIndex: 0
	};

	authenticateUser = async () => {
		const {
			navigation: { navigate }
		} = this.props;
		try {
			await Auth.authenticate();
			return navigate('Main');
		} catch (error) {
			return Alert.alert(error.message);
		}
	};

	render() {
		const { currentIndex } = this.state;
		return (
			<View style={styles.screen}>
				<SideSwipe
					index={currentIndex}
					itemWidth={width}
					style={{ height: 0.8 * height }}
					data={slides}
					useNativeDriver
					onIndexChange={(index: number) =>
						this.setState(() => ({ currentIndex: index }))
					}
					renderItem={({
						itemIndex,
						item
					}: {
						itemIndex: number;
						item: SlideProps;
					}) => <Slide key={itemIndex} {...item} />}
				/>
				<TouchableOpacity style={styles.button} onPress={this.authenticateUser}>
					<Text style={styles.buttonText}>Get Started</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Onboarding;
