import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Modalize } from 'react-native-modalize';

interface AddSafeSpotModalProps {
	modalRef: React.RefObject<Modalize>;
}

const AddSafeSpotModal: React.FC<AddSafeSpotModalProps> = ({ modalRef }) => (
	<Modalize ref={modalRef} modalStyle={styles.modal} adjustToContentHeight>
		<Text style={styles.title}>Add Safe Spot</Text>
	</Modalize>
);

const styles = StyleSheet.create({
	modal: {
		padding: 15,
		backgroundColor: '#202020'
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 24,
		alignSelf: 'flex-start',
		color: '#D3D3D3'
	}
});

export default AddSafeSpotModal;
