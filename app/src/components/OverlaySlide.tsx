import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useAppSelector } from '../../store';

const { width, fontScale } = Dimensions.get('window');

interface OverlaySlideProps {
	title?: string;
	headerRight?: React.ReactNode;
}

const OverlaySlide: React.FC<OverlaySlideProps> = ({
	title,
	children,
	headerRight
}) => {
	const theme = useAppSelector(({ theme }) => theme);
	return (
		<View style={styles.slide}>
			<View style={styles.header}>
				{title && (
					<Text style={[styles.title, { color: theme.secondaryColor }]}>
						{title}
					</Text>
				)}
				{headerRight}
			</View>
			{children}
		</View>
	);
};

const styles = StyleSheet.create({
	slide: {
		width,
		backgroundColor: 'transparent',
		alignItems: 'center',
		padding: 15
	},
	title: {
		fontSize: 34 / fontScale,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	}
});

export default OverlaySlide;
