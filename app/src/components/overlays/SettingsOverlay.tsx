import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import OverlaySlide from '../OverlaySlide';
import { useAppSelector } from '../../../store';
import { toggleTheme } from '../../redux/theme/actions';

interface SettingsOptionProps {
	name: string;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ name }) => {
	const theme = useAppSelector(({ theme }) => theme);
	const dispatch = useDispatch();

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
	};

	return (
		<View style={styles.optionContainer}>
			<Text style={[styles.optionText, { color: theme.secondaryColor }]}>
				{name}
			</Text>
			<Switch value={theme.name === 'dark'} onValueChange={handleToggleTheme} />
		</View>
	);
};

const SettingsOverlay: React.FC = () => (
	<OverlaySlide title='Settings'>
		<SettingsOption name='Dark mode' />
	</OverlaySlide>
);

const styles = StyleSheet.create({
	optionContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '100%'
	},
	optionText: {
		fontSize: 18
	}
});

export default SettingsOverlay;
