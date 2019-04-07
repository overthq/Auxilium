import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';

interface PaginationProps {
	tabs: {
		active: boolean;
	}[];
}

const Pagination = ({ tabs }) => {
	return (
		<View>
			{tabs.map((tab, index) => (
				<View style={[styles.dot, {}]} />
			))}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between'
	},
	dot: {
		backgroundColor: '#FF8282'
	}
});

export default Pagination;
