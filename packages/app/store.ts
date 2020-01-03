import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers, Action } from 'redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import location from './src/redux/location/reducer';
import emergencies from './src/redux/emergencies/reducer';

const appReducer = combineReducers({
	location: persistReducer(
		{ key: 'location', storage: AsyncStorage },
		location
	),
	emergencies: persistReducer(
		{ key: 'emergencies', storage: AsyncStorage },
		emergencies
	)
});
const middlewares = applyMiddleware(thunk, logger);

const rootReducer = (state: any, action: any) => {
	if (action.type === 'AUTH_LOGOUT') {
		Object.keys(state).forEach(key => {
			AsyncStorage.removeItem(`persist:${key}`);
		});
		state = undefined;
	}
	return appReducer(state, action);
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	null,
	Action<string>
>;

export const store = createStore(rootReducer, middlewares);
export const persistor = persistStore(store);
