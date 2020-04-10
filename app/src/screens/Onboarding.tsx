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
import { useDispatch } from 'react-redux';
import Slide from '../components/Slide';
import Pagination from '../components/Pagination';
import { auth } from '../redux/user/actions';

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

const Onboarding: React.FC = () => {
	const [slideIndex, setSlideIndex] = React.useState(0);
	const listRef = React.useRef<FlatList<SlideType>>(null);
	const dispatch = useDispatch();
	const scrollX = new Animated.Value(0);

	const completeOnboarding = () => {
		dispatch(auth());
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
			<View style={styles.skipSection}>
				<TouchableOpacity onPress={completeOnboarding}>
					<Text style={styles.skipText}>SKIP</Text>
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
			<View style={styles.bottomSection}>
				<Pagination {...{ tabs: slides, scrollX }} />
				<TouchableOpacity onPress={scrollToNext} style={styles.actionButton}>
					<Text style={styles.actionText}>
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
	},
	skipSection: {
		flexDirection: 'row',
		justifyContent: 'flex-end',
		padding: 20
	},
	skipText: {
		color: '#FFFFFF'
	},
	bottomSection: {
		padding: 20,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	actionButton: {
		paddingVertical: 5,
		paddingHorizontal: 10,
		borderRadius: 20,
		backgroundColor: '#FFFFFF'
	},
	actionText: {
		color: '#505050'
	}
});

export default Onboarding;
