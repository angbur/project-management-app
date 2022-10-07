import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './user.model';

const API = 'https://whispering-refuge-23508.herokuapp.com/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<Object> {
    return this.http.get<User[]>(API, { responseType: 'json' });
  }

  getUserById(id: string): Observable<Object> {
    return this.http.get<User>(API + id, { responseType: 'json' } );
  }

  updateUserById(data: User, id: string): Observable<Object> {
    return this.http.put(API + id, data,{ responseType: 'text' });
  }

  deleteUserById(id: string): Observable<string> {
    return this.http.delete(API + id, { responseType: 'text' });
  }

}
