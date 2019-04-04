import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Dimensions,
	View,
	Text,
	Image
} from 'react-native';

const { width, height } = Dimensions.get('window');

export interface SlideProps {
	id: number;
	image: any;
	title: string;
	description: string;
}

const Slide = ({ image, title, description }: SlideProps) => (
	<SafeAreaView style={styles.container}>
		<View style={styles.image}>
			<Image
				source={image}
				style={{ height: 0.9 * (height / 2), width: 0.9 * width }}
			/>
		</View>
		<Text style={styles.title}>{title}</Text>
		<Text style={styles.description}>{description}</Text>
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		width,
		height: 0.8 * height,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	image: {
		height: height / 2,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	title: {
		fontSize: 26,
		fontFamily: 'Rubik Medium',
		letterSpacing: 1,
		fontWeight: 'bold',
		textAlign: 'center',
		color: '#1C1C1C'
	},
	description: {
		fontSize: 16,
		fontFamily: 'Rubik Regular',
		textAlign: 'center',
		color: '#505050'
	}
});

export default Slide;
