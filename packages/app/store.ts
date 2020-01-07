import { AsyncStorage } from 'react-native';
import { createStore, applyMiddleware, combineReducers, Action } from 'redux';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import thunk, { ThunkAction } from 'redux-thunk';
import { persistReducer, persistStore } from 'redux-persist';
import logger from 'redux-logger';
import location from './src/redux/location/reducer';
import emergencies from './src/redux/emergencies/reducer';
import safeSpots from './src/redux/safe-spots/reducer';

const middlewares = applyMiddleware(thunk, logger);

const rootReducer = combineReducers({
	location: persistReducer(
		{ key: 'location', storage: AsyncStorage },
		location
	),
	emergencies: persistReducer(
		{ key: 'emergencies', storage: AsyncStorage },
		emergencies
	),
	safeSpots: persistReducer(
		{ key: 'safeSpots', storage: AsyncStorage },
		safeSpots
	)
});

export type RootState = ReturnType<typeof rootReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
	ReturnType,
	RootState,
	null,
	Action<string>
>;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const store = createStore(rootReducer, middlewares);
export const persistor = persistStore(store);
