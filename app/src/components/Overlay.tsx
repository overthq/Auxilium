import React from 'react';
import { ScrollView, StyleSheet, Dimensions } from 'react-native';
import { MapContext } from '../contexts/MapContext';
import { useAppSelector } from '../../store';

const { width } = Dimensions.get('window');

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

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: '#202020'
	}
});

export default Overlay;
