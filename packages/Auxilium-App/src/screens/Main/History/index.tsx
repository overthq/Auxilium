import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { Emergencies } from '../../../api';

class Details extends React.Component {
	state = {
		emergencies: []
	};

	async componentDidMount() {
		const emergencies = await Emergencies.getUserHistory();
		this.setState({ emergencies });
	}

	render() {
		const { emergencies } = this.state;
		return (
			<SafeAreaView>
				<FlatList
					keyExtractor={item => item.id}
					data={emergencies}
					renderItem={({}) => <View />}
				/>
			</SafeAreaView>
		);
	}
}

export default Details;
