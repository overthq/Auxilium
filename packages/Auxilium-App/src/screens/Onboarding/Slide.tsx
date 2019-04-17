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
				style={{ height: 0.9 * (height / 2), width: 0.95 * width }}
				resizeMode='cover'
			/>
		</View>
		<View
			style={{
				display: 'flex',
				flexGrow: 1,
				justifyContent: 'space-between',
				paddingVertical: 50
			}}
		>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</View>
	</SafeAreaView>
);

const styles = StyleSheet.create({
	container: {
		width,
		height: 0.75 * height,
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
		color: '#D3D3D3'
	},
	description: {
		fontSize: 18,
		fontFamily: 'Rubik Regular',
		textAlign: 'center',
		color: '#D3D3D3',
		maxWidth: 0.8 * width
	}
});

export default Slide;
