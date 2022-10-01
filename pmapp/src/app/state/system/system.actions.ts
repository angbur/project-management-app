import { Action } from "@ngrx/store";
import { UserData } from "src/app/_services/user/user.model";
import { AuthenticationData, token } from "./system.reducer";

export enum SystemActionTypes {
  Login = '[System] Log In User',
  LoginSuccess = '[System] Login Success',
  LoginError = '[System] Login Error',
  Logout = '[System] Logout'
};

export class Login implements Action {
  readonly type = SystemActionTypes.Login;
  constructor(public payload: AuthenticationData) { };
};

export class LoginSuccess implements Action {
  readonly type = SystemActionTypes.LoginSuccess;
  constructor(public payload: UserData) {};
};

export class LoginError implements Action {
  readonly type = SystemActionTypes.LoginError;
  constructor(public payload: Error) {};
};

export class Logout implements Action {
  readonly type = SystemActionTypes.Logout;
};

export type SystemActions = Login | LoginSuccess | LoginError | Logout;

