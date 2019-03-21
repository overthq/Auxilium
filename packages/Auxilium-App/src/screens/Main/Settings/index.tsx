import React from 'react';
import {
	View,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	Switch
} from 'react-native';
import { ThemeConsumer } from '../../../context/ThemeContext';

const Settings = () => {
	return (
		<ThemeConsumer>
			{({ dark, theme, toggleTheme }) => (
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
							<Switch value={dark} onValueChange={toggleTheme} />
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
		backgroundColor: '#505050',
		paddingHorizontal: 10
	},
	scroll: {
		flexGrow: 1
	},
	header: {
		fontSize: 30,
		fontFamily: 'Muli Regular',
		paddingVertical: 20
	},
	row: {
		width: '100%',
		height: 40,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	menuoptionName: {
		textTransform: 'uppercase',
		fontFamily: 'Muli Regular',
		fontSize: 14
	}
});

export default Settings;
