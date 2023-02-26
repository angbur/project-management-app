import { token } from 'state/system/system.reducer';

export interface User {
  name: string;
  login: string;
  password?: string;
}

export interface UserData {
  token: token;
  id: string;
}
