import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
	container: {
		display: 'flex',
		backgroundColor: '#FFFFFF'
	},
	input: {
		height: 50,
		backgroundColor: '#D3D3D3',
		width: 0.85 * width,
		paddingLeft: 20,
		borderRadius: 25,
		marginBottom: 20,
		fontSize: 16,
		fontFamily: 'Muli Regular'
	},
	button: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		height: 50,
		backgroundColor: '#000000',
		width: 0.85 * width,
		borderRadius: 25
	}
});
