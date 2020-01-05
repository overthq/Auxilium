import React from 'react';
import { ScrollView, StyleSheet, Dimensions, View } from 'react-native';

const { width } = Dimensions.get('window');

const Overlay: React.FC = ({ children }) => (
	<ScrollView
		horizontal
		showsHorizontalScrollIndicator={false}
		decelerationRate={0}
		style={styles.container}
		contentContainerStyle={styles.content}
	>
		{children}
	</ScrollView>
);

// This component needs a title prop, and we need to use the pagination component here as well.
export const OverlaySlide: React.FC = ({ children }) => (
	<View style={styles.slide}>{children}</View>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		backgroundColor: 'rgba(0, 0, 0, 0.3)',
		width,
		top: 0
	},
	content: {
		padding: 20,
		width
	},
	slide: {
		backgroundColor: 'transparent',
		alignItems: 'center',
		width: '100%'
	}
});

export default Overlay;
