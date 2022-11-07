import { requestStatus } from './../../types';
import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import * as SystemActions from './system.actions';

export interface AuthenticationData {
  login: string;
  password: string;
}

export interface AuthorizationData {
  name: string;
  login: string;
  password: string;
}

export interface AuthorizationDataPayload {
  name: string;
  login: string;
  _id: string;
}

export type token = string | null;

export interface SystemState {
  data?: AuthenticationData | AuthorizationDataPayload;
  token: token;
  isLoggedIn: boolean;
  userId: string | null;
  status: requestStatus;
  error: Error | null;
}

export const initialState: SystemState = {
  token: null,
  isLoggedIn: false,
  userId: null,
  status: 'idle',
  error: null,
};

export const systemReducers = createReducer(
  initialState,
  on(SystemActions.setInitialToken, (state, { token }) => ({
    ...state,
    token: token,
    isLoggedIn: true,
  })),
  on(SystemActions.login, (state, { data }) => ({
    ...state,
    data: data,
    status: 'loading...',
  })),
  on(SystemActions.loginSuccess, (state, { user }) => ({
    ...state,
    token: user.token,
    userId: user.id,
    isLoggedIn: true,
    status: 'succeeded (:',
  })),
  on(SystemActions.loginError, (state, { error }) => ({
    ...state,
    error: error,
    isLoggedIn: false,
    status: 'failed :(',
  })),
  on(SystemActions.logout, state => ({
    ...state,
    token: null,
    isLoggedIn: false,
    status: 'idle',
  })),
  on(SystemActions.register, state => ({ ...state, status: 'loading...',  })),
  on(SystemActions.registerError, (state, { error }) => ({
    ...state,
    status: 'failed :(',
    error: error,
  })),
  on(SystemActions.registerSuccess, state => ({...state, status: 'succeeded (:'}))
);

export const getAuthenticationData = (state: SystemState) => state.data;
export const getUserToken = (state: SystemState) => state.token;
export const getSystemStatus = (state: SystemState) => state.isLoggedIn;
export const getSystemError = (state: SystemState) => state.error;
export const getUserId = (state: SystemState) => state.userId;
