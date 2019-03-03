import React from 'react';
import { View, Text, Image } from 'react-native';
import Swiper from 'react-native-swiper';

interface SlideProps {
	id?: number;
	image: any;
	title: string;
	description: string;
}

const Slide = (props: SlideProps) => {
	const { image, title, description } = props;
	return (
		<View>
			<Image source={image} />
			<View>
				<Text>{title}</Text>
				<Text>{description}</Text>
			</View>
		</View>
	);
};

const slides: SlideProps[] = [
	{
		id: 1,
		image: '',
		title: 'Get help from people around you',
		description: 'Call for help when you are in an emergency.'
	},
	{
		id: 2,
		image: '',
		title: 'Stay anonymous',
		description: 'Never worry about anyone getting your information.'
	},
	{
		id: 3,
		image: '',
		title: '',
		description: ''
	}
];

const Onboarding = () => (
	<Swiper style={{ flex: 1 }} showsButtons={false}>
		{slides.map(({ id, image, title, description }) => (
			<Slide key={id} {...{ image, title, description }} />
		))}
	</Swiper>
);

export default Onboarding;
