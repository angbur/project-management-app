import { Action } from "@ngrx/store";
import { User, UserData } from "src/app/_services/user/user.model";
import { AuthenticationData, AuthorizationData } from "./system.reducer";

export enum SystemActionTypes {
  Login = '[System] Log In User',
  LoginSuccess = '[System] Login Success',
  LoginError = '[System] Login Error',
  Logout = '[System] Logout',
  Register = '[System] Register User',
  RegisterSuccess = '[System] Register Success',
  RegisterError = '[System] Register Error'
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

export class Register implements Action {
  readonly type = SystemActionTypes.Register;
  constructor(public payload: AuthorizationData) {}
};

export class RegisterSuccess implements Action {
  readonly type = SystemActionTypes.RegisterSuccess;
};

export class RegisterError implements Action {
  readonly type = SystemActionTypes.RegisterError;
  constructor(public payload: string) {};
};

export type SystemActions = Login | LoginSuccess | LoginError | Logout | Register | RegisterSuccess | RegisterError;

