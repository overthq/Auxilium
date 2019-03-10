import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

interface DetailsProps {
	location: {
		coordinates: {
			longitude: number;
			latitude: number;
		};
		weatherData: number;
	};
}

const Details = ({
	location: {
		coordinates: { longitude, latitude },
		weatherData
	}
}: DetailsProps) => {
	if (longitude === 0 || latitude === 0) {
		return <View />;
	}
	return (
		<View>
			<Text>{JSON.stringify({ longitude, latitude, weatherData })}</Text>
		</View>
	);
};

const mapStateToProps = ({ location }: { location: any }) => ({ location });

export default connect(mapStateToProps)(Details);
