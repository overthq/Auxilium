import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MapContext } from '../contexts/MapContext';
import { useAppSelector } from '../../store';

const { width, fontScale } = Dimensions.get('window');

const Overlay: React.FC = ({ children }) => {
	const [index, setIndex] = React.useState(0);
	const {
		nearbyEmergencyMarkers,
		safeSpotMarkers,
		setMarkers
	} = React.useContext(MapContext);
	const theme = useAppSelector(({ theme }) => theme);

	React.useEffect(() => {
		switch (index) {
			case 0:
				setMarkers(nearbyEmergencyMarkers);
				break;
			case 1:
				setMarkers(safeSpotMarkers);
				break;
			default:
				break;
		}
	}, [index]);

	return (
		<ScrollView
			horizontal
			pagingEnabled
			snapToInterval={width}
			snapToAlignment='center'
			showsHorizontalScrollIndicator={false}
			decelerationRate={0}
			onMomentumScrollEnd={({
				nativeEvent: {
					contentOffset: { x }
				}
			}) => {
				const sliderIndex = x ? x / width : 0;
				setIndex(sliderIndex);
			}}
			style={[styles.container, { backgroundColor: theme.primaryColor }]}
		>
			{children}
		</ScrollView>
	);
};

interface OverlaySlideProps {
	title?: string;
	headerRight?: React.ReactNode;
}

export const OverlaySlide: React.FC<OverlaySlideProps> = ({
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
	container: {
		flexGrow: 1,
		backgroundColor: '#202020'
	},
	header: {
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 15
	},
	title: {
		fontSize: 34 / fontScale,
		fontWeight: 'bold',
		alignSelf: 'flex-start'
	},
	slide: {
		width,
		backgroundColor: 'transparent',
		alignItems: 'center',
		padding: 15
	}
});

export default Overlay;
