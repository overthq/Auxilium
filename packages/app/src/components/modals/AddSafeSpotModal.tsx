import React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useDispatch } from 'react-redux';
import { addSafeSpot } from '../../redux/safe-spots/actions';
import { useAppSelector } from '../../../store';

interface AddSafeSpotModalProps {
	modalRef: React.RefObject<Modalize>;
}

const AddSafeSpotModal: React.FC<AddSafeSpotModalProps> = ({ modalRef }) => {
	const coordinates = useAppSelector(({ location }) => location.coordinates);
	const [name, setName] = React.useState('');
	const [location, setLocation] = React.useState<EmergencyCoordinates>(
		coordinates
	);
	const dispatch = useDispatch();

	const handleSubmit = () => {
		/* TODO:
			Once the user swipes to the safe-spots overlay, we should make all the safe spots visible on the map.
			Then if the user selects one of them, we do the centerOnCoords thing.
			Importantly, we also have to make the application focus back on the user location when the user goes back to the "Nearby" overlay
		*/
		dispatch(addSafeSpot({ name, location }));
		modalRef.current?.close();
	};

	return (
		<Modalize ref={modalRef} modalStyle={styles.modal} adjustToContentHeight>
			<Text style={styles.title}>Add Safe Spot</Text>
			<TextInput
				style={styles.input}
				placeholder='Safe spot name'
				onChangeText={setName}
			/>
			<TouchableOpacity onPress={handleSubmit}>
				<Text>Submit</Text>
			</TouchableOpacity>
		</Modalize>
	);
};

const styles = StyleSheet.create({
	modal: {
		padding: 15,
		backgroundColor: '#202020'
	},
	input: {
		height: 40,
		padding: 10,
		borderRadius: 6,
		marginVertical: 10
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 24,
		alignSelf: 'flex-start',
		color: '#D3D3D3'
	}
});

export default AddSafeSpotModal;
