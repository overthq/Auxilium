import React from 'react';
import { SafeAreaView, StyleSheet, Dimensions, View, Text } from 'react-native';

const { width, height } = Dimensions.get('window');

export interface SlideProps {
	id?: number;
	image: React.ReactNode;
	title: string;
	description: string;
}

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
		fontFamily: 'Muli SemiBold',
		fontWeight: 'bold',
		textAlign: 'center'
	},
	description: {
		fontSize: 16,
		fontFamily: 'Muli Regular',
		textAlign: 'center',
		color: '#505050'
	}
});

const Slide = (props: SlideProps) => {
	const { image, title, description } = props;
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.image}>{image}</View>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.description}>{description}</Text>
		</SafeAreaView>
	);
};

export default Slide;
