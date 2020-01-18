import React from 'react';
import { View, Text, Switch } from 'react-native';
import { useDispatch } from 'react-redux';
import { OverlaySlide } from '../Overlay';
import { useAppSelector } from '../../../store';
import { toggleTheme } from '../../redux/theme/actions';
import { MapContext } from '../../contexts/MapContext';

interface SettingsOptionProps {
	name: string;
}

const SettingsOption: React.FC<SettingsOptionProps> = ({ name }) => {
	const { toggleMapStyle } = React.useContext(MapContext);
	const theme = useAppSelector(({ theme }) => theme.theme);
	const dispatch = useDispatch();
	// For now, let it do the job of switching themes.
	// i.e it will be reusable for other actions in the "near future".

	const handleToggleTheme = () => {
		dispatch(toggleTheme());
		toggleMapStyle();
	};

	return (
		<View style={{ flexDirection: 'row' }}>
			<Text>{name}</Text>
			<Switch value={theme === 'dark'} onValueChange={handleToggleTheme} />
		</View>
	);
};

const SettingsOverlay = () => {
	return (
		<OverlaySlide title='Settings'>
			<SettingsOption name='Dark mode' />
		</OverlaySlide>
	);
};

export default SettingsOverlay;
