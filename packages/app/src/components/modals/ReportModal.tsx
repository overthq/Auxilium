import React from 'react';
import {
	StyleSheet,
	TextInput,
	Keyboard,
	Dimensions,
	View,
	Text,
	TouchableOpacity
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface ReportModalProps {
	modalRef: React.RefObject<Modalize>;
	action(text: string): Promise<void>;
}

const ReportModal: React.FC<ReportModalProps> = ({ modalRef, action }) => {
	const [text, setText] = React.useState('');

	const handleSubmit = async () => {
		await action(text);
		handleClose();
	};

	const handleClose = () => modalRef.current?.close();

	return (
		<Modalize ref={modalRef} adjustToContentHeight modalStyle={styles.modal}>
			<Text style={styles.title}>Report emergency</Text>
			<TextInput
				style={styles.textArea}
				onChangeText={setText}
				placeholder='What went wrong?'
				placeholderTextColor='#777777'
				multiline
				onBlur={Keyboard.dismiss}
			/>
			{/* Add the "floating" icons to this section. */}
		</Modalize>
	);
};

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#202020',
		padding: 15
	},
	title: {
		fontFamily: 'Rubik Medium',
		fontSize: 24,
		alignSelf: 'flex-start',
		color: '#D3D3D3'
	},
	textArea: {
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		// textAlignVertical: 'top',
		minHeight: height / 3.5,
		marginTop: 10,
		color: '#D3D3D3'
	}
});

export default ReportModal;
