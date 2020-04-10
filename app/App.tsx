import React from 'react';
import { Provider } from 'react-redux';
import Sentry from 'sentry-expo';
import { PersistGate } from 'redux-persist/integration/react';
import { EmergencyProvider } from './src/contexts/EmergencyContext';
import { MapProvider } from './src/contexts/MapContext';
import { store, persistor } from './store';
import Root from './src/Root';

Sentry.config(
	'https://018ed01c2b844dc1bab9fa5a84517b24@sentry.io/1409956'
).install();

const App = () => (
	<Provider store={store}>
		<PersistGate persistor={persistor}>
			<EmergencyProvider>
				<MapProvider>
					<Root />
				</MapProvider>
			</EmergencyProvider>
		</PersistGate>
	</Provider>
);

export default App;
