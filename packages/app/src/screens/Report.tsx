import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Animated,
	StyleSheet,
	Dimensions
} from 'react-native';

import { reportEmergency } from '../api/Emergencies';

import { useAppSelector } from '../../store';

const { width, height } = Dimensions.get('window');
const aspectRatio = width / height;

const EmergencyButton = () => (
	<View style={buttonStyles.buttonInner}>
		<Text style={buttonStyles.buttonText}>!</Text>
	</View>
);

const ReportContent = () => {
	return <View />;
};

const buttonStyles = StyleSheet.create({
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

const Report: React.FC = () => {
	const [mode, setMode] = React.useState<'button' | 'screen'>('button');
	const coordinates = useAppSelector(({ location }) => location.coordinates);
	const animatedWidth = new Animated.Value(100);
	const animatedHeight = new Animated.Value(100);
	const animatedBorderRadius = new Animated.Value(50);

	// We have to use the aspect ratio to set the duration to make sure that the width and height get set at the same time.
	const handlePress = () => {
		// Run a dispatch to make sure that the coordinates are current.
		reportEmergency(coordinates);
	};

	const handleLongPress = async () => {
		Animated.parallel([
			Animated.timing(animatedHeight, {
				toValue: height,
				duration: 500 * aspectRatio
			}),
			Animated.timing(animatedWidth, { toValue: width, duration: 500 }),
			Animated.timing(animatedBorderRadius, { toValue: 0, duration: 500 })
			// Also animate the backgroundColor and borderRadius
		]).start();
		setMode('screen');
	};

	// Remove the TouchableOpacity after animation ends
	return (
		<TouchableOpacity
			onPress={handlePress}
			onLongPress={handleLongPress}
			style={{
				position: 'absolute',
				alignItems: 'center',
				backgroundColor: '#FF8282'
			}}
		>
			<Animated.View style={[{ width: animatedWidth, height: animatedHeight }]}>
				{mode === 'button' ? <EmergencyButton /> : <ReportContent />}
			</Animated.View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'absolute'
	}
});

export default Report;
