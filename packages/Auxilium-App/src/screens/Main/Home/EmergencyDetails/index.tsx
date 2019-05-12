import React from 'react';
import {
	SafeAreaView,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	View
} from 'react-native';
import { connect } from 'react-redux';
import { NavigationScreenProps } from 'react-navigation';
import { Feather } from '@expo/vector-icons';
import { EmergencyMap, ExpandableDetails } from './components';
import { LocationActions } from '../../../../redux/actions';

const { width, height } = Dimensions.get('window');

interface IEmergencyDetailsProps extends NavigationScreenProps {
	coordinates: Coordinates;
	locate(): void;
}

const EmergencyDetails = ({
	navigation,
	coordinates
}: IEmergencyDetailsProps) => {
	const pageDetails: Emergency = navigation.getParam('details');
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity
				style={styles.backButton}
				onPress={() => navigation.pop()}
			>
				<Feather name='arrow-left' size={35} color='#D3D3D3' />
			</TouchableOpacity>
			<EmergencyMap {...{ coordinates, pageDetails }} />
			<View
				style={{
					height,
					width,
					position: 'absolute',
					backgroundColor: 'transparent',
					alignItems: 'flex-end'
				}}
			>
				<ExpandableDetails
					description={pageDetails.description}
					longitude={pageDetails.location.coordinates[0]}
					latitude={pageDetails.location.coordinates[1]}
				/>
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
