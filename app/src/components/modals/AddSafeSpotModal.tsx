import React from 'react';
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	StyleSheet
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import MapView, { Region } from 'react-native-maps';
import { useDispatch } from 'react-redux';
import { addSafeSpot } from '../../redux/safe-spots/actions';
import { useAppSelector } from '../../../store';
import darkMapStyle from '../../styles/darkMapStyle';
import MapMarker from '../MapMarker';

interface AddSafeSpotModalProps {
	modalRef: React.RefObject<Modalize>;
}

const AddSafeSpotModal: React.FC<AddSafeSpotModalProps> = ({ modalRef }) => {
	const coordinates = useAppSelector(({ location }) => location.coordinates);
	const initialRegion = {
		longitude: coordinates.longitude,
		latitude: coordinates.latitude,
		longitudeDelta: 0.00353,
		latitudeDelta: 0.00568
	};
	const [name, setName] = React.useState('');
	const [region, setRegion] = React.useState<Region>(initialRegion);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		const { longitude, latitude } = region;
		dispatch(addSafeSpot({ name, location: { longitude, latitude } }));
		modalRef.current?.close();
	};

	return (
		<Modalize ref={modalRef} modalStyle={styles.modal} adjustToContentHeight>
			<Text style={styles.title}>Add Safe Spot</Text>
			<TextInput
				style={styles.input}
				onChangeText={setName}
				placeholder='Name'
				placeholderTextColor='#505050'
			/>
			<View style={styles.mapContainer}>
				<MapView
					provider='google'
					customMapStyle={darkMapStyle}
					onRegionChange={setRegion}
					style={styles.map}
					{...{ initialRegion }}
				/>
				<View style={{ position: 'absolute' }}>
					<MapMarker color='#2372C6' size={25} />
				</View>
			</View>
			<TouchableOpacity style={styles.button} onPress={handleSubmit}>
				<Text style={styles.buttonText}>Add Safe Spot</Text>
			</TouchableOpacity>
		</Modalize>
	);
};

const styles = StyleSheet.create({
	modal: {
		padding: 15,
		backgroundColor: '#202020'
	},
	title: {
		color: '#D3D3D3',
		alignSelf: 'flex-start',
		fontSize: 25,
		fontWeight: 'bold',
		marginBottom: 10
	},
	input: {
		height: 40,
		padding: 10,
		borderRadius: 6,
		color: '#D3D3D3',
		backgroundColor: '#303030'
	},
	mapContainer: {
		width: '100%',
		marginVertical: 10,
		alignItems: 'center',
		justifyContent: 'center'
	},
	map: {
		height: 300,
		width: '100%',
		borderRadius: 6 // I don't think this works on Android still.
	},
	button: {
		width: '100%',
		height: 40,
		backgroundColor: '#D3D3D3',
		justifyContent: 'center',
		borderRadius: 6,
		marginBottom: 15,
		alignItems: 'center'
	},
	buttonText: {
		color: '#202020',
		fontSize: 16,
		fontWeight: '500'
	}
});

export default AddSafeSpotModal;
