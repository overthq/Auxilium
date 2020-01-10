import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	StyleSheet,
	Dimensions
} from 'react-native';
import {
	LongPressGestureHandler,
	TapGestureHandler,
	State
} from 'react-native-gesture-handler';

import { reportEmergency } from '../api/Emergencies';

import { useAppSelector } from '../../store';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const EmergencyButton = () => (
	<View style={styles.buttonInner}>
		<Text style={styles.buttonText}>!</Text>
	</View>
);

const ReportContent = () => <View />;

const Report: React.FC = () => {
	const [mode, setMode] = React.useState<'button' | 'screen'>('button');
	const coordinates = useAppSelector(({ location }) => location.coordinates);

	const animatedWidth = new Animated.Value(100);
	const animatedHeight = new Animated.Value(100);
	const animatedBorderRadius = new Animated.Value(50);

	const handlePress = () => {
		// Run a dispatch to make sure that the coordinates are current.
		reportEmergency(coordinates);
	};

	const handleLongPress = () => {
		Animated.parallel([
			Animated.timing(animatedHeight, {
				toValue: height,
				duration: 500 * (1 / aspectRatio)
			}),
			Animated.timing(animatedWidth, { toValue: width, duration: 500 }),
			Animated.timing(animatedBorderRadius, { toValue: 0, duration: 500 })
		]).start();
		setMode('screen');
	};

	return (
		<LongPressGestureHandler
			onHandlerStateChange={({ nativeEvent }) => {
				if (nativeEvent.state === State.ACTIVE) {
					handleLongPress();
				}
			}}
			minDurationMs={800}
		>
			<TapGestureHandler
				onHandlerStateChange={() => {
					handlePress();
				}}
			>
				<Animated.View
					style={[
						styles.container,
						{
							width: animatedWidth,
							height: animatedHeight,
							borderRadius: animatedBorderRadius
						}
					]}
				>
					{mode === 'button' ? <EmergencyButton /> : <ReportContent />}
				</Animated.View>
			</TapGestureHandler>
		</LongPressGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute'
	},
	buttonInner: {
		width: 60,
		height: 60,
		borderRadius: 30,
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#FF8282'
	},
	buttonText: {
		fontSize: 30,
		color: '#FFFFFF',
		fontWeight: 'bold'
	}
});

export default Report;
