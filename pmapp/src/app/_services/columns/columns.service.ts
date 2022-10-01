import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API = 'https://whispering-refuge-23508.herokuapp.com/boards/';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  constructor(private http: HttpClient) { }

  getColumnsInBoard( boardId: string ): Observable<any> {
    return this.http.get(API + boardId + '/columns', { responseType: 'text' });
  }

  createColumnInBoard( boardId: string ): Observable<any> {
    return this.http.post(API + boardId + '/columns', { responseType: 'text' });
  }

  getColumnById( boardId: string, columnId: string ): Observable<any> {
    return this.http.get(API + boardId + '/columns/'+columnId, { responseType: 'text' });
  }

  updateColumnById( boardId: string, columnId: string ): Observable<any> {
    return this.http.put(API + boardId + '/columns/'+columnId, { responseType: 'text' });
  }

  deleteColumnById( boardId: string, columnId: string ): Observable<any> {
    return this.http.delete(API + boardId + '/columns/'+columnId, { responseType: 'text' });
  }
}
