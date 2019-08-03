import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1C1C1C',
		alignItems: 'center'
	},
	scrollContainer: {
		flexGrow: 1,
		alignItems: 'center'
	},
	sectionHeader: {
		fontSize: 20,
		fontFamily: 'Rubik Bold',
		marginVertical: 20,
		alignSelf: 'flex-start',
		letterSpacing: 1,
		color: '#D3D3D3'
	}
});

export default styles;
