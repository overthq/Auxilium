import React from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

interface PaginationProps {
	tabs: { title: string; description: string }[];
	scrollX: Animated.Value;
}

const Pagination: React.FC<PaginationProps> = ({ tabs, scrollX }) => {
	const position = Animated.divide(scrollX, width);

	return (
		<View style={styles.container}>
			{tabs.map((_, index) => {
				const width = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [10, 30, 10],
					extrapolate: 'clamp'
				});

				return <Animated.View key={index} style={[styles.dot, { width }]} />;
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	dot: {
		height: 7,
		borderRadius: 3.5,
		marginRight: 5,
		backgroundColor: '#FFFFFF'
	}
});

export default Pagination;
