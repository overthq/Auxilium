import React from 'react';
import { StatusBar } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import AppNavigator from './screens';
import { LOCATION_TASK, getBackgroundUpdates } from './helpers/tasks';
import { cacheLocation } from './api/Emergencies';

const Root = () => {
	React.useEffect(() => {
		getBackgroundUpdates();
		StatusBar.setBarStyle('light-content');
	}, []);

	return <AppNavigator />;
};

TaskManager.defineTask(LOCATION_TASK, ({ data, error }: any) => {
	if (error) console.error(error.message);
	if (data) {
		const { locations } = data;
		console.log({ locations });
		const {
			coords: { longitude, latitude }
		} = locations[0] as { coords: EmergencyCoordinates };
		cacheLocation({ longitude, latitude });
	}
});

export default Root;
