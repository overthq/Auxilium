import React from 'react';
import {
	FlatList,
	StyleSheet,
	SafeAreaView,
	Animated,
	Dimensions,
	View,
	TouchableOpacity,
	Text
} from 'react-native';
import { Slide, Pagination } from '../components/Onboarding';
import { NavigationScreenProp } from 'react-navigation';
import { Auth } from '../api';

const { width } = Dimensions.get('window');

interface SlideType {
	title: string;
	description: string;
}

const slides: SlideType[] = [
	{
		title: 'Get help',
		description: 'Call for help when you are in an emergency.'
	},
	{
		title: 'Help others',
		description: 'Lend a helping hand to others during emergencies.'
	},
	{
		title: 'Retain your anonymity',
		description:
			'Never worry about anyone gaining access to your personal information.'
	}
];

interface OnboardingProps {
	navigation: NavigationScreenProp<any, any>;
}

const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
	const [slideIndex, setSlideIndex] = React.useState(0);
	const listRef = React.useRef<FlatList<SlideType>>(null);
	const scrollX = new Animated.Value(0);

	const completeOnboarding = () => {
		Auth.authenticate();
		navigation.navigate('Overview');
	};

	const scrollToNext = () => {
		if (slideIndex === slides.length - 1) {
			return completeOnboarding();
		}
		listRef.current &&
			listRef.current.scrollToIndex({ animated: true, index: slideIndex + 1 });
	};

	const handleScroll = Animated.event([
		{ nativeEvent: { contentOffset: { x: scrollX } } }
	]);

	return (
		<SafeAreaView style={styles.container}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'flex-end',
					padding: 20
				}}
			>
				<TouchableOpacity onPress={completeOnboarding}>
					<Text style={{ color: '#FFFFFF', fontFamily: 'Rubik Medium' }}>
						SKIP
					</Text>
				</TouchableOpacity>
			</View>
			<FlatList
				data={slides}
				ref={listRef}
				horizontal
				showsHorizontalScrollIndicator={false}
				pagingEnabled
				snapToInterval={width}
				decelerationRate={0}
				snapToAlignment='center'
				keyExtractor={({ title }) => title}
				renderItem={({ item, index }) => <Slide key={index} {...item} />}
				onMomentumScrollEnd={({
					nativeEvent: {
						contentOffset: { x }
					}
				}) => {
					const sliderIndex = x ? x / width : 0;
					setSlideIndex(sliderIndex);
				}}
				onScroll={handleScroll}
			/>
			<View
				style={{
					padding: 20,
					flexDirection: 'row',
					justifyContent: 'space-between',
					alignItems: 'center'
				}}
			>
				<Pagination {...{ tabs: slides, scrollX }} />
				<TouchableOpacity
					onPress={scrollToNext}
					style={{
						paddingVertical: 5,
						paddingHorizontal: 10,
						borderRadius: 20,
						backgroundColor: '#FFFFFF'
					}}
				>
					<Text style={{ fontFamily: 'Rubik Medium', color: '#505050' }}>
						{slideIndex !== slides.length - 1 ? 'NEXT' : 'DONE'}
					</Text>
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#FF8282'
	}
});

export default Onboarding;
