import React from 'react';
import { Notifications } from 'expo';
import Onboarding from './Onboarding';
import Overview from './Overview';
import { EmergencyContext } from '../contexts/EmergencyContext';
import { useAppSelector } from '../../store';

const AppNavigator: React.FC = () => {
	const { openEmergency } = React.useContext(EmergencyContext);
	const user = useAppSelector(({ user }) => user.user);

	React.useEffect(() => {
		const notificationSubscription = Notifications.addListener(
			({ origin, data }) => {
				if (origin === 'selected') openEmergency(data);
			}
		);
		return () => {
			notificationSubscription.remove();
		};
	}, []);

	// Add fallback for AUTH_LOADING state.
	return !!user ? <Overview /> : <Onboarding />;
};

export default AppNavigator;
