export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTHENTICATE_SUCCESS = 'AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAILURE = 'AUTHENTICATE_FAILURE';
export const LOG_OUT = 'LOG_OUT';

interface AuthenticateActionType {
	type: typeof AUTH_LOADING;
}

interface AuthenticateSuccessActionType {
	type: typeof AUTHENTICATE_SUCCESS;
	payload: { user: User };
}

interface AuthenticateFailureActionType {
	type: typeof AUTHENTICATE_FAILURE;
	payload: { errorMessage: string };
}

interface LogOutActionType {
	type: typeof LOG_OUT;
}

export interface UserState {
	loading: boolean;
	user: User | null;
	errorMessage: string;
}

export type UserActionTypes =
	| AuthenticateActionType
	| AuthenticateSuccessActionType
	| AuthenticateFailureActionType
	| LogOutActionType;
