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
import mapStyle from './mapStyle';
import { NewMarker } from '../Overview/components';

const { width, height } = Dimensions.get('window');

const EmergencyDetails = (props: NavigationScreenProps) => {
	const { navigation } = props;
	const pageDetails: Emergency = navigation.getParam('details');
	const {
		location: {
			coordinates: [longitude, latitude]
		},
		description
	} = pageDetails;
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
					<NewMarker size={40} />
				</MapView.Marker>
			</MapView>
			<View style={styles.descriptionView}>
				<View>
					<Feather name='navigation' color='#D3D3D3' size={16} />
					<Text style={styles.description}>{`${latitude}, ${longitude}`}</Text>
				</View>
				<Text style={styles.description}>{description}</Text>
			</View>
		</SafeAreaView>
	);
};

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

export default EmergencyDetails;
