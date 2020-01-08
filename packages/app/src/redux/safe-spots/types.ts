export const FETCH_SAFE_SPOTS = 'FETCH_SAFE_SPOTS';
export const FETCH_SAFE_SPOTS_SUCCESS = 'FETCH_SAFE_SPOTS_SUCCESS';
export const FETCH_SAFE_SPOTS_FAILURE = 'FETCH_SAFE_SPOTS_FAILURE';
export const DELETE_SAFE_SPOT = 'DELETE_SAFE_SPOT';
export const DELETE_SAFE_SPOT_FAILURE = 'DELETE_SAFE_SPOT_FAILURE';

interface FetchSafeSpotsAction {
	type: typeof FETCH_SAFE_SPOTS;
}

interface FetchSafeSpotsSuccessAction {
	type: typeof FETCH_SAFE_SPOTS_SUCCESS;
	payload: { safeSpots: SafeSpot[] };
}

interface FetchSafeSpotsFailureAction {
	type: typeof FETCH_SAFE_SPOTS_FAILURE;
	payload: { errorMessage: string };
}

interface DeleteSafeSpotAction {
	type: typeof DELETE_SAFE_SPOT;
	payload: { id: string };
}

interface DeleteSafeSpotFailureAction {
	type: typeof DELETE_SAFE_SPOT_FAILURE;
	payload: { errorMessage: string };
}

export interface SafeSpotsState {
	loading: boolean;
	safeSpots: SafeSpot[];
	errorMessage: string;
}

export type SafeSpotsActionTypes =
	| FetchSafeSpotsAction
	| FetchSafeSpotsSuccessAction
	| FetchSafeSpotsFailureAction
	| DeleteSafeSpotAction
	| DeleteSafeSpotFailureAction;
