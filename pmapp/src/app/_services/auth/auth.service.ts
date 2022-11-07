import { selectLoginStatus } from './../../state/index';
import { getSystemStatus } from './../../state/system/system.reducer';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationData, AuthorizationData, SystemState } from 'src/app/state/system/system.reducer';
import { Store } from '@ngrx/store';

const API = 'https://whispering-refuge-23508.herokuapp.com/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient,
    private readonly store: Store<SystemState>) {}

  login(loginData: AuthenticationData): Observable<Object> {
    return this.http.post(API + 'signin', loginData, httpOptions);
  };

  logout(): void {
    sessionStorage.removeItem('token');
  };

  register(registerData: AuthorizationData): Observable<any> {
    return this.http.post(API + 'signup', registerData, httpOptions);
  };

  isAuthenticated(): Observable<boolean> {
    return this.store.select(selectLoginStatus);
  };

  getToken(): Observable<string | null> {
    return of(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null)
  };

  setToken(token: string): void {
    sessionStorage.setItem('token', token);
  };
};
