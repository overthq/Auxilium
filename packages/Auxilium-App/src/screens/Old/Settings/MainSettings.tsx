import React from 'react';
import {
	View,
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	Switch,
	TouchableOpacity
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeConsumer } from '../../../context';

const swap = (val: 'light' | 'dark') => {
	let output: string;
	if (val === 'light') {
		output = 'dark';
	} else {
		output = 'light';
	}
	return output;
};

const MainSettings = ({ navigation: { navigate } }) => {
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
						<TouchableOpacity onPress={() => navigate('Contacts')}>
							<View style={styles.row}>
								<Text
									style={[styles.menuoptionName, { color: theme.textColor }]}
								>
									Manage Contacts
								</Text>
								<Feather name='arrow-right' color={theme.textColor} size={20} />
							</View>
						</TouchableOpacity>
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
		fontSize: 45,
		fontFamily: 'Rubik Black',
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
		fontFamily: 'Rubik Regular',
		fontSize: 14
	}
});

export default MainSettings;
