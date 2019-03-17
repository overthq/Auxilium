import React from 'react';
import { SafeAreaView, FlatList, Text, StyleSheet } from 'react-native';
import { Detail } from './components';
import { Emergencies } from '../../../api';

interface HistoryState {
	emergencies: Emergency[];
}

export default class History extends React.Component<{}, HistoryState> {
	state: HistoryState = {
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
				<Text
					style={{
						fontSize: 40,
						fontFamily: 'Muli SemiBold',
						color: '#000000'
					}}
				>
					History
				</Text>
				<FlatList
					style={styles.list}
					keyExtractor={({ _id: id }) => id}
					data={emergencies}
					renderItem={({ item }) => {
						const { _id: id } = item;
						return <Detail key={id} {...item} />;
					}}
				/>
			</SafeAreaView>
		);
	}
}

const styles = StyleSheet.create({
	list: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center'
	}
});
