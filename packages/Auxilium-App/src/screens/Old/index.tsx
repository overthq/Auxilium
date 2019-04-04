import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
/* eslint-disable-next-line */
import { Feather } from '@expo/vector-icons';
import History from './History';
import MainMap from './MainMap';
import Settings from './Settings';

export default createBottomTabNavigator(
	{
		History: { screen: History },
		MainMap: { screen: MainMap },
		Settings: { screen: Settings }
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			/* eslint-disable react/display-name, react/prop-types */
			tabBarIcon: ({ tintColor }) => {
				const { routeName } = navigation.state;
				let iconName;
				if (routeName === 'History') {
					iconName = 'list';
				} else if (routeName === 'MainMap') {
					iconName = 'map';
				} else if (routeName === 'Settings') {
					iconName = 'settings';
				}
				return <Feather name={iconName} color={tintColor} size={24} />;
			}
		}),
		tabBarOptions: {
			style: {
				backgroundColor: '#000000'
			},
			activeTintColor: '#FF7060',
			inactiveTintColor: '#D3D3D3',
			showLabel: false
		},
		animationEnabled: false,
		swipeEnabled: false,
		tabBarPosition: 'bottom',
		initialRouteName: 'MainMap'
	}
);
