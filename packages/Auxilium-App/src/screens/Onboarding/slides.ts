/* eslint-disable global-require, no-unused-vars */
import { SlideProps } from './Slide';

const slides: SlideProps[] = [
	{
		id: 1,
		image: require('../../../assets/Notify.png'),
		title: 'Get help',
		description: 'Call for help when you are in an emergency.'
	},
	{
		id: 2,
		image: require('../../../assets/Help_Others.png'),
		title: 'Help others',
		description: 'Lend a helping hand to others during emergencies.'
	},
	{
		id: 3,
		image: require('../../../assets/Security.png'),
		title: 'Stay anonymous',
		description: 'Never worry about anyone stealing your personal information.'
	}
];

export default slides;
