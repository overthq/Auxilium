import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

interface DetailsProps {
	location: {
		coords: {
			longitude: number;
			latitude: number;
		};
		weatherData: number;
	};
}

const Details = ({
	location: {
		coords: { longitude, latitude },
		weatherData
	}
}: DetailsProps) => {
	if (longitude === 0 || latitude === 0) {
		return <View />;
	}
	return <Text>{JSON.stringify({ longitude, latitude, weatherData })}</Text>;
};

const mapStateToProps = ({ location }: { location: any }) => ({ location });

export default connect(mapStateToProps)(Details);
