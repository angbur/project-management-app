import { createAction, props } from "@ngrx/store";
import { UserData } from "src/app/_services/user/user.model";
import { AuthenticationData, AuthorizationData } from "./system.reducer";

export const login = createAction('[System] Log in User', props<{data: AuthenticationData}>());

export const loginSuccess = createAction('[System] Login Success', props<{user: UserData}>());

export const loginError = createAction('[System] Log in error', props<{error: Error}>());

export const logout = createAction('[System] Logout');

export const register = createAction('[System] Register', props<{data: AuthorizationData}>());

export const registerSuccess = createAction('[System] Register Success');

export const registerError = createAction('[System] Register Error', props<{error: Error}>());
