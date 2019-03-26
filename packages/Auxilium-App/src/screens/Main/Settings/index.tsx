import React from 'react';
import {
	View,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	Switch
} from 'react-native';
import { ThemeConsumer } from '../../../context';

const swap = (val: any) => {
	let output: string;
	if (val === 'light') {
		output = 'dark';
	} else {
		output = 'light';
	}
	return output;
};

const Settings = () => {
	return (
		<ThemeConsumer>
			{({ theme, toggleTheme }) => (
				<SafeAreaView
					style={[styles.container, { backgroundColor: theme.backgroundColor }]}
				>
					<ScrollView style={styles.scroll}>
						<Text style={[styles.header, { color: theme.textColor }]}>
							Settings
						</Text>
						<View style={styles.row}>
							<Text style={[styles.menuoptionName, { color: theme.textColor }]}>
								Dark Mode
							</Text>
							<Switch
								value={theme.name === 'dark'}
								onValueChange={() => toggleTheme(swap(theme.name))}
								trackColor={{ false: '#D3D3D3', true: '#FF8282' }}
							/>
						</View>
					</ScrollView>
				</SafeAreaView>
			)}
		</ThemeConsumer>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#505050'
	},
	scroll: {
		flexGrow: 1,
		paddingHorizontal: 20
	},
	header: {
		fontSize: 40,
		fontFamily: 'Muli SemiBold',
		paddingVertical: 20
	},
	row: {
		width: '100%',
		height: 40,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	menuoptionName: {
		textTransform: 'uppercase',
		fontFamily: 'Muli Regular',
		fontSize: 14
	}
});

export default Settings;
