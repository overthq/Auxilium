import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center'
	},
	scrollContainer: {
		flexGrow: 1,
		alignItems: 'center'
	},
	sectionHeaderText: {
		fontSize: 20,
		fontFamily: 'Rubik Bold',
		letterSpacing: 1,
		color: '#D3D3D3'
	},
	sectionHeader: {
		marginVertical: 20,
		marginLeft: 20,
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf: 'flex-start'
	}
});

export default styles;
