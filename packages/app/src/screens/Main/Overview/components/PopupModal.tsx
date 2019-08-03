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
import Modalize from 'react-native-modalize';
import { Feather } from '@expo/vector-icons';

const { height } = Dimensions.get('window');

interface PopupModalProps {
	modalRef: React.RefObject<Modalize>;
	action(text: string): void;
}

const PopupModal = ({ modalRef, action }: PopupModalProps) => {
	const [text, setText] = React.useState('');

	const handleSubmit = async () => {
		await action(text);
		handleClose();
	};

	const handleClose = () => {
		modalRef.current && modalRef.current.close();
	};

	return (
		<Modalize
			ref={modalRef}
			adjustToContentHeight
			handlePosition='inside'
			modalStyle={styles.modal}
		>
			<View style={styles.modalHeader}>
				<TouchableOpacity onPress={handleClose}>
					<Feather name='x' color='#FF8282' size={20} />
				</TouchableOpacity>
				<Text style={styles.modalTitle}>Report emergency</Text>
				<TouchableOpacity onPress={handleSubmit}>
					<Feather name='send' color='#FF8282' size={20} />
				</TouchableOpacity>
			</View>
			<TextInput
				style={styles.textArea}
				onChangeText={value => setText(value)}
				placeholder='What went wrong?'
				placeholderTextColor='#777777'
				multiline
				onBlur={Keyboard.dismiss}
			/>
		</Modalize>
	);
};

const styles = StyleSheet.create({
	modal: {
		backgroundColor: '#505050',
		overflow: 'hidden'
	},
	modalHeader: {
		width: '100%',
		height: 50,
		backgroundColor: '#111111',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingHorizontal: 20
	},
	modalTitle: {
		color: '#D3D3D3',
		fontFamily: 'Rubik Bold',
		fontSize: 16
	},
	textArea: {
		minHeight: height / 3,
		width: '100%',
		padding: 20,
		fontFamily: 'Rubik Regular',
		fontSize: 16,
		color: '#D3D3D3'
	}
});

export default PopupModal;
