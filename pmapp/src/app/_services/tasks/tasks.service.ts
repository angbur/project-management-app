import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const API_baseURL = 'https://whispering-refuge-23508.herokuapp.com/';
const API = API_baseURL + 'boards/';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http: HttpClient) { }

  getAllTasksInColumn( boardId: string, columnId: string ): Observable<string> {
    return this.http.get(API + boardId + '/columns/' + columnId + '/tasks', { responseType: 'text' });
  }

  createTaskInColumn( boardId: string, columnId: string ): Observable<Object> {
    return this.http.post(API + boardId + '/columns/' + columnId + '/tasks', { responseType: 'text' });
  }

  getTaskById( boardId: string, columnId: string, taskId: string ): Observable<string> {
    return this.http.get(API + boardId + '/columns/'+ columnId + '/tasks/' + taskId, { responseType: 'text' });
  }

  updateTaskById( boardId: string, columnId: string, taskId: string ): Observable<Object> {
    return this.http.put(API + boardId + '/columns/'+ columnId + '/tasks/' + taskId, { responseType: 'text' });
  }

  deleteTaskById( boardId: string, columnId: string, taskId: string ): Observable<Object> {
    return this.http.delete(API + boardId + '/columns/'+ columnId + '/tasks/' + taskId, { responseType: 'text' });
  }

  getTaskByBoardId( boardId: string ): Observable<Object> {
    return this.http.get(API_baseURL + 'tasksSet/' + boardId, { responseType: 'text' });
  }

  searchTask( userId?: string, searchQuery?:string ): Observable<Object> {
    return this.http.get(API_baseURL + 'tasksSet?userId=' + userId + '&search=' + searchQuery, { responseType: 'text' });
  }
}
