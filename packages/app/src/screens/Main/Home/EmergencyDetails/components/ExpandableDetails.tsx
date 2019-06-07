import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LocationHelpers } from '../../../../../helpers';

const { height } = Dimensions.get('window');

interface ExpandableDetailsProps {
	description?: string;
	longitude: number;
	latitude: number;
}

const ExpandableDetails = (props: ExpandableDetailsProps) => {
	const { description, longitude, latitude } = props;
	const [place, setPlace] = React.useState('');
	React.useEffect(() => {
		loadPlace();
	}, []);

	const loadPlace = async () => {
		const { longitude, latitude } = props;
		const place = await LocationHelpers.getAddressFromCoords({
			longitude,
			latitude
		});
		setPlace(place);
	};

	const animatedHeight = new Animated.Value(height / 4);
	const onPanGestureEvent = () => {
		Animated.event(
			[
				{
					nativeEvent: {
						contentOffset: { y: animatedHeight }
					}
				}
			],
			{ useNativeDriver: true }
		);
	};

	return (
		<PanGestureHandler onGestureEvent={onPanGestureEvent}>
			<Animated.View style={[styles.container, { height: animatedHeight }]}>
				<Text style={styles.emergencyDescription}>{description}</Text>
				<Text style={styles.emergencyAddress}>{place}</Text>
				<Text style={styles.emergencyLongLat}>
					{`${longitude.toFixed(4)}, ${latitude.toFixed(4)}`}
				</Text>
			</Animated.View>
		</PanGestureHandler>
	);
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#505050',
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		padding: 20,
		width: '100%'
	},
	emergencyDescription: {
		color: '#D3D3D3',
		fontSize: 20,
		fontFamily: 'Rubik Medium'
	},
	emergencyAddress: {
		fontSize: 18,
		color: '#D3D3D3',
		fontFamily: 'Rubik Regular',
		marginVertical: 5
	},
	emergencyLongLat: {
		color: '#a0a0a0',
		fontSize: 14,
		fontFamily: 'Rubik Regular'
	}
});

export default ExpandableDetails;
