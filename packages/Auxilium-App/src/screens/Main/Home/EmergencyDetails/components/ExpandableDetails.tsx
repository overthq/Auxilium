import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import {
	PanGestureHandler,
	PanGestureHandlerGestureEvent
} from 'react-native-gesture-handler';

const { height } = Dimensions.get('window');

const ExpandableDetails = () => {
	const animatedHeight = new Animated.Value(height / 4);
	const onPanGestureEvent = () => {
		Animated.interpolate(animatedHeight, {
			inputRange: [0, 1],
      outputRange: [(height / 4), (height / 2)],
			extrapolate: Animated.Extrapolate.CLAMP
		});
	};

	return (
		<PanGestureHandler onGestureEvent={onPanGestureEvent}>
			<Animated.View style={[styles.container, { height: animatedHeight }]} />
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#505050',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10
	}
});

export default ExpandableDetails;
