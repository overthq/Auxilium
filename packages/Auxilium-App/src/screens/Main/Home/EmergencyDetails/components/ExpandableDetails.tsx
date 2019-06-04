import React from 'react';
import { Dimensions, StyleSheet, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { LocationHelpers } from '../../../../../helpers';

const { height } = Dimensions.get('window');

interface IExpandableDetailsState {
	place: string;
}

interface IExpandableDetailsProps {
	description?: string;
	longitude: number;
	latitude: number;
}
class ExpandableDetails extends React.PureComponent<
	IExpandableDetailsProps,
	IExpandableDetailsState
> {
	state: IExpandableDetailsState = {
		place: ''
	};

	componentDidMount() {
		this.loadPlace();
	}

	loadPlace = async () => {
		const { longitude, latitude } = this.props;
		const place = await LocationHelpers.getAddressFromCoords({
			longitude,
			latitude
		});
		this.setState({ place });
	};

	render() {
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
			// Use Animated.event to animate height between (height / 4) and (height / 2)
			// Or find out if translationY is a good idea.
			// Or, we could use scaleY to increase the vertical height
			// Go from scaleY: (height / 4) to (height / 2)
		};

		const { description, longitude, latitude } = this.props;
		const { place } = this.state;
		return (
			<PanGestureHandler onGestureEvent={onPanGestureEvent}>
				<Animated.View style={[styles.container, { height: animatedHeight }]}>
					<Text style={styles.emergencyDescription}>{description}</Text>
					<Text style={styles.emergencyAddress}>{place}</Text>
					<Text style={styles.emergencyLongLat}>
						{`${longitude}, ${latitude}`}
					</Text>
					{/* We can also use the animation value to interpolate the opacity of the name of place text */}
				</Animated.View>
			</PanGestureHandler>
		);
	}
}

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
	emergencyLongLat: {
		color: '#D3D3D3',
		fontSize: 16,
		fontFamily: 'Rubik Regular'
	},
	emergencyAddress: {
		fontSize: 18,
		color: '#D3D3D3',
		fontFamily: 'Rubik Regular'
	}
});

export default ExpandableDetails;
