import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NewColumn } from './column.model';

const API = 'https://whispering-refuge-23508.herokuapp.com/boards/';

@Injectable({
  providedIn: 'root',
})
export class ColumnsService {
  constructor(private http: HttpClient) {}

  getColumnsInBoard(boardId: string): Observable<Object> {
    return this.http.get(API + boardId + '/columns', { responseType: 'json' });
  }

  createColumnInBoard(data: NewColumn, boardId: string): Observable<Object> {
    return this.http.post(API + boardId + '/columns', data, { responseType: 'json' });
  }

  getColumnById(boardId: string, columnId: string): Observable<Object> {
    return this.http.get(API + boardId + '/columns/' + columnId, { responseType: 'json' });
  }

  updateColumnById(boardId: string, columnId: string): Observable<Object> {
    return this.http.put(API + boardId + '/columns/' + columnId, boardId, { responseType: 'json' });
  }

  deleteColumnById(boardId: string, columnId: string): Observable<Object> {
    return this.http.delete(API + boardId + '/columns/' + columnId, { responseType: 'json' });
  }
}
