import { createAction } from '@ngrx/store';
import { Action } from '@ngrx/store';
import { User } from 'src/app/_services/user/user.model';

export enum UserActionTypes {
  UpdateUser = '[User] Update Data',
  UserAdded = '[User] Added',
  UserAddedError = '[User] Added Error'
};

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor(public payload: User) { };
};

export class UserAdded implements Action {
  readonly type = UserActionTypes.UserAdded;
  constructor(public payload: User) { };
};

export class UserAddedError implements Action {
  readonly type = UserActionTypes.UserAddedError;
  constructor(public payload: string) { };
}

export type UserActions = UpdateUser
| UserAdded
| UserAddedError;
