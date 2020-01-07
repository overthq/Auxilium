export const FETCH_SAFE_SPOTS = 'FETCH_SAFE_SPOTS';
export const FETCH_SAFE_SPOTS_SUCCESS = 'FETCH_SAFE_SPOTS';
export const FETCH_SAFE_SPOTS_FAILURE = 'FETCH_SAFE_SPOTS';
export const ADD_SAFE_SPOT = 'ADD_SAFE_SPOT';

interface FetchSafeSpots {
	type: typeof FETCH_SAFE_SPOTS;
}

interface FetchSafeSpotsSuccess {
	type: typeof FETCH_SAFE_SPOTS_SUCCESS;
	payload: {
		safeSpots: SafeSpot[];
	};
}

interface FetchSafeSpotsFailure {
	type: typeof FETCH_SAFE_SPOTS_FAILURE;
	payload: {
		errorMessage: string;
	};
}

export type SafeSpotsActionTypes =
	| FetchSafeSpots
	| FetchSafeSpotsSuccess
	| FetchSafeSpotsFailure;
