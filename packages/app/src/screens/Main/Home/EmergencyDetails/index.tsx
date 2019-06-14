import React from 'react';
import {
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	View
} from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import { EmergencyMap, ExpandableDetails } from './components';

const { width, height } = Dimensions.get('window');

interface EmergencyDetailsState {
	location: {
		coordinates: EmergencyCoordinates;
	};
}

const stateMapper = ({ location }: EmergencyDetailsState) => ({
	coordinates: location.coordinates
});

const EmergencyDetails = (props: NavigationScreenProps) => {
	const { navigation } = props;
	const { coordinates } = useSelector(stateMapper);
	const pageDetails: Emergency = navigation.getParam('details');
	const {
		description,
		location: {
			coordinates: [longitude, latitude]
		}
	} = pageDetails;
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.pop()}
			>
				<Feather name='arrow-left' size={35} color='#D3D3D3' />
			</TouchableOpacity>
			<EmergencyMap {...{ coordinates, longitude, latitude }} />
			<View style={styles.detailsHolder}>
				<ExpandableDetails {...{ description, longitude, latitude }} />
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
	},
	detailsHolder: {
		height,
		width,
		position: 'absolute',
		backgroundColor: 'transparent',
		alignItems: 'center',
		justifyContent: 'flex-end'
	}
});

export default EmergencyDetails;
