import { token } from "src/app/state/system/system.reducer"

export interface User {
  name: string,
  login: string,
  password?: string
}

export interface UserData {
  token: token,
  _id: string
}
