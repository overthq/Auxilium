import React from 'react';
import { Provider } from 'react-redux';
import Sentry from 'sentry-expo';
/* eslint-disable import/no-unresolved */
import { useScreens } from 'react-native-screens';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';
import Root from './src/Root';

// persistor.purge();
Sentry.config(
	'https://018ed01c2b844dc1bab9fa5a84517b24@sentry.io/1409956'
).install();
useScreens();

const App = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<Root />
		</PersistGate>
	</Provider>
);

export default App;
