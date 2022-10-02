import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationData, AuthorizationData } from 'src/app/state/system/system.reducer';

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

  register(registerData: AuthorizationData): Observable<any> {
    return this.http.post(API + 'signup', registerData, httpOptions);
  }
}
