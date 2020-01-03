export const FETCH_EMERGENCIES = 'FETCH_EMERGENCIES';
export const FETCH_EMERGENCIES_SUCCESS = 'FETCH_EMERGENCIES_SUCCESS';
export const FETCH_EMERGENCIES_FAILURE = 'FETCH_EMERGENCIES_FAILURE';

interface FetchEmergenciesAction {
	type: typeof FETCH_EMERGENCIES;
}
interface FetchEmergenciesSuccessAction {
	type: typeof FETCH_EMERGENCIES_SUCCESS;
	payload: {
		emergencies: Emergency[];
	};
}

interface FetchEmergenciesFailureAction {
	type: typeof FETCH_EMERGENCIES_FAILURE;
	payload: {
		errorMessage: string;
	};
}

export interface EmergenciesState {
	loading: boolean;
	emergencies: Emergency[];
	errorMessage: string;
}

export type EmergenciesAction =
	| FetchEmergenciesAction
	| FetchEmergenciesSuccessAction
	| FetchEmergenciesFailureAction;
