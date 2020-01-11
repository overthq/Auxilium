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
	headerRight?: React.ReactNode;
}

export const OverlaySlide: React.FC<OverlaySlideProps> = ({
	title,
	children,
	headerRight
}) => (
	<View style={styles.slide}>
		<View style={styles.header}>
			{title && <Text style={styles.title}>{title}</Text>}
			{headerRight}
		</View>
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
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginVertical: 7.5
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 26,
		alignSelf: 'flex-start',
		color: '#D3D3D3'
	},
	slide: {
		width,
		backgroundColor: 'transparent',
		alignItems: 'center',
		padding: 20
	}
});

export default Overlay;
