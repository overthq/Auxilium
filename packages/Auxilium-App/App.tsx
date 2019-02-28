import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';
import Root from './src/Root';

persistor.purge();

const App = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Root />
		</PersistGate>
	</Provider>
);

export default App;
