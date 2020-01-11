import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Overlay: React.FC = ({ children }) => (
	<ScrollView
		horizontal
		pagingEnabled
		snapToInterval={width}
		snapToAlignment='center'
		showsHorizontalScrollIndicator={false}
		decelerationRate={0}
		style={styles.container}
	>
		{children}
	</ScrollView>
);

interface OverlaySlideProps {
	title?: string;
}

export const OverlaySlide: React.FC<OverlaySlideProps> = ({
	title,
	children
}) => (
	<View style={styles.slide}>
		{title && <Text style={styles.title}>{title}</Text>}
		{children}
	</View>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		zIndex: 10,
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		top: 0
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 24,
		alignSelf: 'flex-start',
		color: '#D3D3D3',
		marginVertical: 7.5
	},
	slide: {
		width,
		backgroundColor: 'transparent',
		alignItems: 'center',
		padding: 20
	}
});

export default Overlay;
