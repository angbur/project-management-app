import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Column } from './column.model';

const API = 'https://whispering-refuge-23508.herokuapp.com/boards/';

@Injectable({
  providedIn: 'root'
})
export class ColumnsService {

  constructor(private http: HttpClient) { }

  getColumnsInBoard( boardId: string ): Observable<Object> {
    return this.http.get(API + boardId + '/columns', { responseType: 'json' });
  }

  createColumnInBoard( data: any, boardId: string ): Observable<any> {
    return this.http.post(API + boardId + '/columns', data, { responseType: 'text' });
  }

  getColumnById( boardId: string, columnId: string ): Observable<Object> {
    return this.http.get(API + boardId + '/columns/'+ columnId, { responseType: 'json' });
  }

  updateColumnById( boardId: string, columnId: string ): Observable<any> {
    return this.http.put(API + boardId + '/columns/'+columnId, boardId, { responseType: 'text' });
  }

  deleteColumnById( boardId: string, columnId: string ): Observable<any> {
    return this.http.delete(API + boardId + '/columns/'+columnId, { responseType: 'text' } );
  }
}
