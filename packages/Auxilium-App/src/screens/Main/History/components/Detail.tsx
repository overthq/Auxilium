import React from 'react';
import { View, Text } from 'react-native';

const Detail = ({ coordinates }) => (
	<View>
		<Text>At {JSON.stringify(coordinates)}</Text>
	</View>
);

export default Detail;
