import React from 'react';
import {
	View,
	Text,
	Image,
	Dimensions,
	SafeAreaView,
	TouchableOpacity,
	Alert
} from 'react-native';
import SideSwipe from 'react-native-sideswipe';
import { Auth } from '../../api';
/* eslint-disable global-require */

const { width, height } = Dimensions.get('window');

interface SlideProps {
	id?: number;
	image: React.ReactNode;
	title: string;
	description: string;
}

const Slide = (props: SlideProps) => {
	const { image, title, description } = props;
	return (
		<SafeAreaView
			style={{
				width,
				height: 0.8 * height,
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'space-between',
				alignItems: 'center'
			}}
		>
			<View
				style={{
					height: height / 2,
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center'
				}}
			>
				{image}
			</View>

			<Text
				style={{
					fontSize: 26,
					fontFamily: 'Muli SemiBold',
					fontWeight: 'bold',
					textAlign: 'center'
				}}
			>
				{title}
			</Text>
			<Text
				style={{
					fontSize: 16,
					fontFamily: 'Muli Regular',
					textAlign: 'center',
					color: '#505050'
				}}
			>
				{description}
			</Text>
		</SafeAreaView>
	);
};

const slides: SlideProps[] = [
	{
		id: 1,
		image: (
			<Image
				source={require('../../../assets/Notify.png')}
				style={{ height: 300, width: 300 }}
			/>
		),
		title: 'Get help',
		description: 'Call for help when you are in an emergency.'
	},
	{
		id: 2,
		image: (
			<Image
				source={require('../../../assets/Help_Others.png')}
				style={{ height: 300, width: 300 }}
			/>
		),
		title: 'Help others',
		description: 'Lend a helping hand to others during emergencies.'
	},
	{
		id: 3,
		image: (
			<Image
				source={require('../../../assets/Security.png')}
				style={{ height: 300, width: 300 }}
			/>
		),
		title: 'Stay anonymous',
		description: 'Never worry about anyone getting your information.'
	}
];

class Onboarding extends React.Component {
	state = {
		currentIndex: 0
	};

	authenticateUser = async () => {
		const {
			navigation: { navigate }
		} = this.props;
		try {
			const auth = await Auth();
			navigate('Main');
			return auth;
		} catch (error) {
			return Alert.alert(error.message);
		}
	};

	render() {
		const { currentIndex } = this.state;
		return (
			<View
				style={{
					flex: 1,
					alignItems: 'center',
					justifyContent: 'space-between'
				}}
			>
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
				<TouchableOpacity
					style={{
						height: 50,
						width: 0.8 * width,
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						borderRadius: 25,
						backgroundColor: '#FF8282',
						marginBottom: 20
					}}
					onPress={this.authenticateUser}
				>
					<Text
						style={{
							color: '#FFFFFF',
							fontFamily: 'Muli SemiBold',
							fontSize: 20
						}}
					>
						Get Started
					</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

export default Onboarding;
