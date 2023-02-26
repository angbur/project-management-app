import { createAction, props } from '@ngrx/store';
import { requestError } from 'types';
import { UserData } from '_services/user/user.model';
import { AuthenticationData, AuthorizationData } from './system.reducer';

export const login = createAction('[System] Log in User', props<{ data: AuthenticationData }>());

export const loginSuccess = createAction('[System] Login Success', props<{ user: UserData }>());

export const loginError = createAction('[System] Log in error', props<{ error: requestError }>());

export const logout = createAction('[System] Logout');

export const register = createAction('[System] Register', props<{ data: AuthorizationData }>());

export const registerSuccess = createAction('[System] Register Success');

export const registerError = createAction('[System] Register Error', props<{ error: requestError }>());

export const loadUserName = createAction('[System] Load UserName');

export const userNameLoaded = createAction('[System] UserName data Loaded', props<{ userName: string }>());

export const userNameLoadedError = createAction(
  '[System] UserName Data Loaded Error',
  props<{ error: requestError }>()
);
