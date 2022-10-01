import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API = 'https://whispering-refuge-23508.herokuapp.com/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post(API + 'signin', {
      login,
      password
    }, httpOptions)
  }

  register(name: string, login: string, password: string): Observable<any> {
    return this.http.post(API + 'signup', {
      name,
      login,
      password
    }, httpOptions);
  }
}
