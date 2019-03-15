import React from 'react';
import { View, Text } from 'react-native';

const Detail = ({ location: { coordinates } }: Emergency) => (
	<View>
		<Text>At {JSON.stringify(coordinates)}</Text>
	</View>
);

export default Detail;
