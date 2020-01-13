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
		dispatch(addSafeSpot({ name, location }));
		modalRef.current?.close();
	};

	// Add a map to this modal that allows the user to select his/her location.
	// This should be easy to do, but I'm not sure if the user experience will be optimal.
	// (Remember to iterate on this in the future).

	return (
		<Modalize ref={modalRef} modalStyle={styles.modal} adjustToContentHeight>
			<Text style={styles.title}>Add Safe Spot</Text>
			<TextInput
				style={styles.input}
				onChangeText={setName}
				placeholder='Name'
				placeholderTextColor='#505050'
			/>
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
	input: {
		height: 40,
		padding: 10,
		borderRadius: 6,
		marginVertical: 10,
		color: '#D3D3D3',
		backgroundColor: '#303030'
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 24,
		alignSelf: 'flex-start',
		color: '#D3D3D3'
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
		fontFamily: 'Rubik Medium',
		fontSize: 16
	}
});

export default AddSafeSpotModal;
