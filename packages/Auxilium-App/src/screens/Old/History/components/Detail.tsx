import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { ThemeConsumer } from '../../../../context';

const { width } = Dimensions.get('window');

class Detail extends React.PureComponent<Emergency, { address: string }> {
	state: { address: string } = {
		address: ''
	};

	async componentDidMount() {
		const {
			location: { coordinates }
		} = this.props;
		const [longitude, latitude] = coordinates;
		const address = await this.getAddressFromCoords({ longitude, latitude });
		this.setState({ address });
	}

	getAddressFromCoords = async ({ longitude, latitude }: Coordinates) => {
		try {
			const response = await fetch(
				`https://api.mapbox.com/geocoding/v5/mapbox.places/${longitude},${latitude}.json?access_token=pk.eyJ1Ijoia29yZWRlMzYwIiwiYSI6ImNqZno1MGN2YjBhOTgyd2xlbWFhMGQ3dmwifQ.1AbAu_Ga4bu4iQCnOgBfog`
			);
			const { features } = await response.json();
			return features[0].place_name;
		} catch (error) {
			Alert.alert(error.message);
		}
	};

	render() {
		const { address } = this.state;
		return (
			<ThemeConsumer>
				{({ theme }) => (
					<View style={styles.container}>
						<Feather name='map-pin' color={theme.textColor} size={14} />
						<Text style={[styles.text, { color: theme.textColor }]}>
							{address}
						</Text>
					</View>
				)}
			</ThemeConsumer>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		height: 50,
		width: 0.8 * width,
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text: {
		fontFamily: 'Rubik Regular',
		fontSize: 14
	}
});

export default Detail;
