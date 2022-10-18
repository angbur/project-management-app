import { on } from '@ngrx/store';
import { createReducer } from '@ngrx/store';
import * as SystemActions from './system.actions';

export interface AuthenticationData {
  login: string,
  password: string,
};

export interface AuthorizationData {
  name: string,
  login: string,
  password: string,
};

export interface AuthorizationDataPayload {
  name: string,
  login: string,
  _id: string,
};

export type token = string | null;

export interface SystemState {
  data?: AuthenticationData | AuthorizationDataPayload,
  token: token,
  isLoggedIn: boolean,
  userId: string | null,
  error: Error | null
};

export const initialState: SystemState = {
  token: null,
  isLoggedIn: false,
  userId: null,
  error: null
};

export const systemReducers = createReducer(
  initialState,
  on(SystemActions.login, (state, {data})=> ({
    ...state,
    data: data})),
  on(SystemActions.loginSuccess, (state, {user})=>(
    {...state,
      token: user.token,
      userId: user.id,
      isLoggedIn: true})),
  on(SystemActions.loginError, (state, {error})=>({
    ...state,
    error: error})),
  on(SystemActions.logout, state=>({
    ...state,
    token: null,
    isLoggedIn: false})),
  on(SystemActions.register, (state) => ({...state})),
  on(SystemActions.registerError, (state, {error})=>({
    ...state,
    error: error}))
);

export const getAuthenticationData = (state: SystemState) => state.data;
export const getUserToken = (state: SystemState) => state.token;
export const getSystemStatus = (state: SystemState) => state.isLoggedIn;
export const getSystemError = (state: SystemState) => state.error;
export const getUserId = (state: SystemState) => state.userId;

