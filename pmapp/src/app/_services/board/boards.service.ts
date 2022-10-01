import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'https://whispering-refuge-23508.herokuapp.com/boards/';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  createBoard(title: string, owner: string, users: string[]): Observable<any> {
    return this.http.post(API, { responseType: 'text' });
  }

  getBoardById(id: string): Observable<any> {
    return this.http.get(API + id, { responseType: 'text' });
  }

  updateBoardById(id: string): Observable<any> {
    return this.http.put(API + id, { responseType: 'text' });
  }

  deleteBoardById(id: string): Observable<any> {
    return this.http.delete(API + id, { responseType: 'text' });
  }

  getAllBoardsForUser(userId: string): Observable<any> {
    return this.http.get('https://whispering-refuge-23508.herokuapp.com/boardsSet/' + userId, { responseType: 'text' });
  }
}
