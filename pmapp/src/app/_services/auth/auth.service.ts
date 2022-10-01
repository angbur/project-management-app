import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationData } from 'src/app/state/system/system.reducer';
import { UserData } from '../user/user.model';

const API = 'https://whispering-refuge-23508.herokuapp.com/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(loginData: AuthenticationData): Observable<Object> {
    return this.http.post(API + 'signin', loginData, httpOptions)
  }

  register(name: string, login: string, password: string): Observable<any> {
    return this.http.post(API + 'signup', {
      name,
      login,
      password
    }, httpOptions);
  }
}
