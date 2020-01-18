import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import { OverlaySlide } from '../Overlay';
import { useAppSelector } from '../../../store';
import { toggleTheme } from '../../redux/theme/actions';

interface SettingsOptionProps {
	name: string;
}

// For now, this will do the job of switching themes.
// i.e it will be reusable for other actions in the "near future".
const SettingsOption: React.FC<SettingsOptionProps> = ({ name }) => {
	const theme = useAppSelector(({ theme }) => theme.theme);
	const dispatch = useDispatch();

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	return (
		<View style={styles.optionContainer}>
			<Text style={styles.optionText}>{name}</Text>
			<Switch value={theme === 'dark'} onValueChange={handleToggleTheme} />
		</View>
	);
};

const SettingsOverlay = () => (
	<OverlaySlide title='Settings'>
		<SettingsOption name='Dark mode' />
	</OverlaySlide>
);

const styles = StyleSheet.create({
	optionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%',
		height: 45
	},
	optionText: {
		fontFamily: 'Rubik Regular',
		fontSize: 18,
		color: '#D3D3D3'
	}
});

export default SettingsOverlay;
