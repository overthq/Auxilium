import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
	top: {
		width,
		padding: 0.05 * width,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		marginVertical: 15
	},
	locationName: {
		fontSize: 20,
		fontFamily: 'Rubik Bold',
		letterSpacing: 1,
		color: '#D3D3D3'
	},
	sectionHeader: {
		fontSize: 20,
		fontFamily: 'Rubik Bold',
		letterSpacing: 1,
		color: '#D3D3D3',
		alignSelf: 'flex-start',
		padding: 0.05 * width
	}
});

export default styles;
