import { SystemActions, SystemActionTypes } from "./system.actions";

export interface AuthenticationData {
  login: string,
  password: string,
};

export type token = string | null;

export interface SystemState {
  data?: AuthenticationData,
  token: token,
  isLoggedIn: boolean,
  userId: string | null,
  error: string | null
};

export const initialState: SystemState = {
  token: null,
  isLoggedIn: false,
  userId: null,
  error: null
};

export function systemReducers(
  state = initialState, action: any): SystemState {
  switch (action.type) {
    case SystemActionTypes.Login:
      return {
        ...state,
        data: action.payload
      }
    case SystemActionTypes.LoginSuccess:
        return {
          ...state,
          token: action.payload.token,
          userId: action.payload._id,
          isLoggedIn: true
        }
    case SystemActionTypes.Logout:
      return {
        ...state,
        token: null,
        isLoggedIn: false
      }
    case SystemActionTypes.LoginError:
      return {
        ...state,
        error: action.payload.message
      }
    default:
      return state;
  }
};

export const getAuthenticationData = (state: SystemState) => state.data;
export const getUserToken = (state: SystemState) => state.token;
export const getSystemStatus = (state: SystemState) => state.isLoggedIn;

