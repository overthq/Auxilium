import React from 'react';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

interface PaginationProps {
	tabs: any[];
	scrollX: Animated.Value;
}

const Pagination = ({ tabs, scrollX }: PaginationProps) => {
	const position = Animated.divide(scrollX, width);
	return (
		<View style={styles.container}>
			{tabs.map((_, index) => {
				const opacity = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [0.4, 1, 0.4],
					extrapolate: 'clamp'
				});
				const scale = position.interpolate({
					inputRange: [index - 1, index, index + 1],
					outputRange: [0.8, 1, 0.8]
				});
				return (
					<Animated.View
						key={index}
						style={[
							styles.dot,
							{ opacity, transform: [{ scaleX: scale }, { scaleY: scale }] }
						]}
					/>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		width: width / 4,
		marginBottom: 20
	},
	dot: {
		backgroundColor: '#FF8282',
		height: 12,
		width: 12,
		borderRadius: 10
	}
});

export default Pagination;
