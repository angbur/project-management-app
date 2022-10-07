import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Board } from './board.model';

const API = 'https://whispering-refuge-23508.herokuapp.com/boards/';

@Injectable({
  providedIn: 'root'
})
export class BoardsService {

  constructor(private http: HttpClient) { }

  createBoard(boardData: Board): Observable<any> {
    return this.http.post(API, boardData, { responseType: 'text' });
  }

  getBoardById(id: string): Observable<any> {
    return this.http.get(API + id, { responseType: 'text' });
  }

  updateBoardById(boardData: Board, id: string): Observable<any> {
    return this.http.put(API + id, boardData, { responseType: 'text' });
  }

  deleteBoardById(id: string): Observable<any> {
    return this.http.delete(API + id, { responseType: 'json' });
  }

  getAllBoardsForUser(userId: string): Observable<any> {
    return this.http.get<Board[]>('https://whispering-refuge-23508.herokuapp.com/boardsSet/' + userId, { responseType: 'json' });
  }
}
