import React from 'react';
import AppLoading from 'expo-app-loading';
import Onboarding from './Onboarding';
import Overview from './Overview';
import { useAppSelector } from '../../store';

const AppNavigator: React.FC = () => {
	const { loading, user } = useAppSelector(({ user }) => user);

	if (loading) return <AppLoading />;
	return !!user ? <Overview /> : <Onboarding />;
};

export default AppNavigator;
