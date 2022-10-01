import { Action } from '@ngrx/store';
import { User } from 'src/app/_services/user/user.model';

export enum UserActionTypes {
  UpdateUser = '[User] Update Data'
};

export class UpdateUser implements Action {
  readonly type = UserActionTypes.UpdateUser;
  constructor(public payload: User) { };
};

export type UserActions = UpdateUser;
;
