import React from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	Keyboard,
	Dimensions
} from 'react-native';
import { Modalize } from 'react-native-modalize';
import { useAppSelector } from '../../../store';

const { height } = Dimensions.get('window');

interface ReportModalProps {
	modalRef: React.RefObject<Modalize>;
	action(text: string): Promise<void>;
}

const ReportModal: React.FC<ReportModalProps> = ({ modalRef, action }) => {
	const [text, setText] = React.useState('');
	const theme = useAppSelector(({ theme }) => theme);

	const handleSubmit = async () => {
		await action(text);
		handleClose();
	};

	const handleClose = () => modalRef.current?.close();

	return (
		<Modalize
			ref={modalRef}
			adjustToContentHeight
			modalStyle={[styles.modal, { backgroundColor: theme.primaryColor }]}
		>
			<Text style={[styles.title, { color: theme.secondaryColor }]}>
				Report emergency
			</Text>
			<TextInput
				style={styles.textArea}
				onChangeText={setText}
				placeholder='What went wrong?'
				placeholderTextColor='#777777'
				multiline
				onBlur={Keyboard.dismiss}
			/>
			{/* TODO: Add the "floating" icons to this section. */}
		</Modalize>
	);
};

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#202020',
		padding: 15
	},
	title: {
		fontWeight: 'bold',
		fontSize: 25,
		alignSelf: 'flex-start'
	},
	textArea: {
		fontSize: 16,
		minHeight: height / 3.5,
		marginVertical: 10,
		textAlignVertical: 'top',
		color: '#D3D3D3'
	}
});

export default ReportModal;
