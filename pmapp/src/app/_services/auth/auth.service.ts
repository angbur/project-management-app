import { selectLoginStatus } from 'state/index';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { AuthenticationData, AuthorizationData, SystemState } from 'state/system/system.reducer';
import { Store } from '@ngrx/store';
import { environment } from '../../../environments/environment';

const API = `${environment.apiUrl}auth/`;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private readonly store: Store<SystemState>) {}

  login(loginData: AuthenticationData): Observable<Object> {
    return this.http.post(API + 'signin', loginData, httpOptions);
  }

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
  }

  register(registerData: AuthorizationData): Observable<any> {
    return this.http.post(API + 'signup', registerData, httpOptions);
  }

  isAuthenticated(): Observable<boolean> {
    return this.store.select(selectLoginStatus);
  }

  getToken(): Observable<string | null> {
    return of(sessionStorage.getItem('token') ? sessionStorage.getItem('token') : null);
  }

  setToken(token: string, id: string): void {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userId', id);
  }
}
