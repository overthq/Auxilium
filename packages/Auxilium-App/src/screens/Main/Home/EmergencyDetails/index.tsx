import React from 'react';
import {
	SafeAreaView,
	StyleSheet,
	TouchableOpacity,
	View,
	Text,
	Dimensions
} from 'react-native';
import { MapView } from 'expo';
import { Feather } from '@expo/vector-icons';
import { NavigationScreenProps } from 'react-navigation';
import { connect } from 'react-redux';

import mapStyle from './mapStyle';
import { MapMarker } from '../Overview/components';
import { LocationHelpers } from '../../../../helpers';
import { LocationActions } from '../../../../redux/actions';

const { width, height } = Dimensions.get('window');

interface IEmergencyDetailsProps extends NavigationScreenProps {
	coordinates: Coordinates;
	locate(): void;
}

class EmergencyDetails extends React.Component<
	IEmergencyDetailsProps,
	{ route: any[] }
> {
	state = {
		route: []
	};

	async componentDidMount() {
		const { coordinates: fromCoords } = this.props;
		const { navigation } = this.props;
		const pageDetails: Emergency = navigation.getParam('details');
		const {
			location: {
				coordinates: [longitude, latitude]
			}
		} = pageDetails;
		const from = fromCoords;
		const to = { longitude, latitude };
		const route = await LocationHelpers.getNavigationRoute(from, to);
		this.setState({ route });
	}

	render() {
		const { navigation } = this.props;
		const { route } = this.state;
		const pageDetails: Emergency = navigation.getParam('details');
		const {
			location: {
				coordinates: [longitude, latitude]
			},
			description
		} = pageDetails;
		const roundNum = (x: number) => Math.round(x) / 10000;
		return (
			<SafeAreaView style={styles.container}>
				<TouchableOpacity
					style={styles.backButton}
					onPress={() => navigation.pop()}
				>
					<Feather name='arrow-left' size={35} color='#D3D3D3' />
				</TouchableOpacity>
				<MapView
					style={styles.map}
					provider='google'
					customMapStyle={mapStyle}
					initialRegion={{
						longitude,
						latitude,
						longitudeDelta: 0.00353,
						latitudeDelta: 0.00568
					}}
				>
					<MapView.Marker coordinate={{ longitude, latitude }}>
						<MapMarker size={20} borderStroke={3} />
					</MapView.Marker>
					{/* TODO: Add a polyline to show directions to emergency position */}
					<MapView.Polyline
						coordinates={route}
						strokeColor='#FF8282'
						strokeWidth={3}
					/>
				</MapView>
				<View style={styles.descriptionView}>
					<View style={{ flexDirection: 'row' }}>
						<Feather
							name='navigation'
							color='#D3D3D3'
							size={16}
							style={{ marginRight: 10 }}
						/>
						<Text style={styles.description}>
							{`${roundNum(latitude)}, ${roundNum(longitude)}`}
						</Text>
					</View>
					<Text style={styles.description}>{description}</Text>
				</View>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: '#1C1C1C'
	},
	map: {
		width,
		height: height * 0.7
	},
	backButton: {
		position: 'absolute',
		top: 25,
		left: 5,
		zIndex: 1000
	},
	descriptionView: {
		flexGrow: 1,
		width,
		padding: 20,
		justifyContent: 'space-around'
	},
	description: {
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		color: '#D3D3D3'
	}
});

const mapStateToProps = ({ location: { coordinates } }: any) => ({
	coordinates
});

const mapDispatchToProps = { locate: LocationActions.locate };

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(EmergencyDetails);
