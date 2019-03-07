import React from 'react';
import { Image } from 'react-native';
/* eslint-disable-next-line */
import { SlideProps } from './Slide';
/* eslint-disable global-require */

const slides: SlideProps[] = [
	{
		id: 1,
		image: (
			<Image
				source={require('../../../assets/Notify.png')}
				style={{ height: 300, width: 300 }}
			/>
		),
		title: 'Get help',
		description: 'Call for help when you are in an emergency.'
	},
	{
		id: 2,
		image: (
			<Image
				source={require('../../../assets/Help_Others.png')}
				style={{ height: 300, width: 300 }}
			/>
		),
		title: 'Help others',
		description: 'Lend a helping hand to others during emergencies.'
	},
	{
		id: 3,
		image: (
			<Image
				source={require('../../../assets/Security.png')}
				style={{ height: 300, width: 300 }}
			/>
		),
		title: 'Stay anonymous',
		description: 'Never worry about anyone getting your information.'
	}
];

export default slides;
