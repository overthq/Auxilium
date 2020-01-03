import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000000',
		alignItems: 'center'
	},
	actions: {
		flexGrow: 1,
		justifyContent: 'flex-end',
		position: 'relative',
		alignItems: 'center',
		bottom: 0
	},
	scrollContainer: {
		position: 'absolute',
		bottom: 20,
		height: 500,
		alignItems: 'center',
		backgroundColor: 'transparent'
	}
});

export default styles;
