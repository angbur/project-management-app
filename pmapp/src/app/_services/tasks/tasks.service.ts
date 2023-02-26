import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TaskSet, NewTask } from './task.model';

const API = `${environment.apiUrl}boards/`;

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  constructor(private http: HttpClient) {}

  getAllTasksInColumn(boardId: string, columnId: string): Observable<Object> {
    return this.http.get(API + boardId + '/columns/' + columnId + '/tasks', { responseType: 'json' });
  }

  createTaskInColumn(data: NewTask, boardId: string, columnId: string): Observable<Object> {
    return this.http.post(API + boardId + '/columns/' + columnId + '/tasks', data, { responseType: 'json' });
  }

  getTaskById(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.get(API + boardId + '/columns/' + columnId + '/tasks/' + taskId, { responseType: 'json' });
  }

  updateTaskById(data: any, boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.put(API + boardId + '/columns/' + columnId + '/tasks/' + taskId, data, { responseType: 'json' });
  }

  deleteTaskById(boardId: string, columnId: string, taskId: string): Observable<Object> {
    return this.http.delete(API + boardId + '/columns/' + columnId + '/tasks/' + taskId, { responseType: 'json' });
  }

  getTaskByBoardId(boardId: string): Observable<Object> {
    return this.http.get(environment.apiUrl + 'tasksSet/' + boardId, { responseType: 'json' });
  }

  searchTask(userId?: string, searchQuery?: string): Observable<Object> {
    return this.http.get(environment.apiUrl + 'tasksSet?userId=' + userId + '&search=' + searchQuery, {
      responseType: 'text',
    });
  }

  updateTaskSet(data: TaskSet) {
    return this.http.patch(environment.apiUrl + 'tasksSet', data, { responseType: 'json' });
  }
}
