import React from 'react';
import { Image, Dimensions } from 'react-native';
/* eslint-disable-next-line */
import { SlideProps } from './Slide';
/* eslint-disable global-require */

const { width, height } = Dimensions.get('window');

const slides: SlideProps[] = [
	{
		id: 1,
		image: (
			<Image
				source={require('../../../assets/Notify.png')}
				style={{ height: 0.9 * (height / 2), width: 0.9 * width }}
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
				style={{ height: 0.9 * (height / 2), width: 0.9 * width }}
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
				style={{ height: 0.9 * (height / 2), width: 0.9 * width }}
			/>
		),
		title: 'Stay anonymous',
		description: 'Never worry about anyone getting your information.'
	}
];

export default slides;
