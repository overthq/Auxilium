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

const { width, height } = Dimensions.get('window');

const EmergencyDetails = (props: NavigationScreenProps) => {
	const {
		navigation: {
			state: { params }
		}
	} = props;
	const {
		location: {
			coordinates: { longitude, latitude }
		},
		description
	} = params;
	return (
		<SafeAreaView style={styles.container}>
			<TouchableOpacity>
				<Feather name='arrow-left' size={35} color='' />
			</TouchableOpacity>
			<MapView
				style={styles.map}
				initialRegion={{
					longitude,
					latitude,
					longitudeDelta: 0.00353,
					latitudeDelta: 0.00568
				}}
			/>
			<View>
				<Text>{description}</Text>
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
		height: height * 0.7,
		pointerEvents: 'none'
	}
});

export default EmergencyDetails;
