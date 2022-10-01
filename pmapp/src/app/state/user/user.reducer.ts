import { User } from 'src/app/_services/user/user.model';
import { UserActions, UserActionTypes } from './user.actions';

export const initialUser: User = {
  name: '',
  login: ''
};

export interface UserState {
  user: User
};

export const initialState: UserState = {
  user: initialUser
};

export function userReducers(
  state = initialState, action: any): UserState {
  switch (action.type) {
    case UserActionTypes.UpdateUser:
      return {
        user: action.payload
      }
    default:
      return state;
  }
};
