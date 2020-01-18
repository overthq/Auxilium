import React from 'react';
import { View, Text, ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MapContext } from '../contexts/MapContext';

const { width } = Dimensions.get('window');

const Overlay: React.FC = ({ children }) => {
	const [index, setIndex] = React.useState(0);
	const {
		nearbyEmergencyMarkers,
		safeSpotMarkers,
		setMarkers
	} = React.useContext(MapContext);

	React.useEffect(() => {
		switch (index) {
			case 0:
				setMarkers(nearbyEmergencyMarkers);
				break;
			case 1:
				setMarkers(safeSpotMarkers);
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
			style={styles.container}
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
		alignSelf: 'flex-start'
	},
	slide: {
		width,
		backgroundColor: 'transparent',
		alignItems: 'center',
		padding: 20
	}
});

export default Overlay;
