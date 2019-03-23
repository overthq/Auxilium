import React from 'react';
import {
	SafeAreaView,
	FlatList,
	Text,
	StyleSheet,
	StatusBar
} from 'react-native';
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
		StatusBar.setBarStyle('dark-content');
		return (
			<SafeAreaView>
				<Text
					style={{
						fontSize: 40,
						fontFamily: 'Muli SemiBold',
						color: '#000000',
						paddingVertical: 20,
						paddingLeft: 20
					}}
				>
					History
				</Text>
				<FlatList
					contentContainerStyle={styles.list}
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
		flexGrow: 1,
		flexDirection: 'column',
		alignItems: 'center',
		marginTop: 40
	}
});
