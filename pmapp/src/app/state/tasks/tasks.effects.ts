import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { TasksState } from './tasks.reducer';
import { BoardsState } from 'src/app/state/boards/boards.reducer';
import * as TasksActions from './tasks.actions';
import { NewTask, Task } from 'src/app/_services/tasks/task.model';
import { TasksService } from 'src/app/_services/tasks/tasks.service';
import { getActualBoardId, selectUserId } from './../index';
import { SystemState } from '../system/system.reducer';
import { isString } from '../type.guard';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      withLatestFrom(this.taskStore.select(getActualBoardId)),
      mergeMap(([, boardId]) =>
        this.TasksService.getTaskByBoardId(boardId as string).pipe(
          map((tasks: any) => TasksActions.tasksLoaded({ tasks: tasks as Task[] })),
          catchError((error: Error) => of(TasksActions.tasksLoadedError({ error: error })))
        )
      )
    )
  );

  updateTaskSet$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTasksSet),
      mergeMap((data: any) =>
        this.TasksService.updateTaskSet(data.tasks).pipe(
          map((tasks: any) => TasksActions.tasksSetUpdated({ tasks: tasks })),
          catchError((error: Error) => of(TasksActions.tasksSetUpdatedError({ error })))
        )
      )
    )
  );

  addTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.addTask),
      withLatestFrom(this.boardStore.select(getActualBoardId), this.systemStore.select(selectUserId)),
      mergeMap(([action, boardId, userId]) =>
        this.TasksService.createTaskInColumn(
          setUserId(action.task, isString(userId) ? userId : ''),
          isString(boardId) ? boardId : '',
          action.colId
        ).pipe(
          map(data => TasksActions.taskAdded({ task: data as Task })),
          catchError(error => of(TasksActions.taskAddedError({ error })))
        )
      )
    )
  );

  taskAddedSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.taskAdded),
        tap(() => {
          this.toastr.success('Task added!');
        })
      ),
    { dispatch: false }
  );

  taskAddedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TasksActions.taskAddedError),
        tap(() => {
          this.toastr.error('Failed!');
        })
      ),
    { dispatch: false }
  );

  deleteTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.deleteTask),
      withLatestFrom(this.boardStore.select(getActualBoardId)),
      mergeMap(([action, boardId]) =>
        this.TasksService.deleteTaskById(isString(boardId) ? boardId : '', action.colId, action.taskId).pipe(
          map(data => TasksActions.taskDeleted({ task: data as Task })),
          catchError(error => of(TasksActions.taskDeletedError({ error })))
        )
      )
    )
  );

  updateTask$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.updateTask),
      withLatestFrom(this.boardStore.select(getActualBoardId)),
      mergeMap(([action, boardId]) =>
        this.TasksService.updateTaskById(
          action.task,
          isString(boardId) ? boardId : '',
          action.colId,
          action.taskId
        ).pipe(
          map(data => TasksActions.taskUpdated({ task: data as Task })),
          catchError(error => of(TasksActions.taskUpdatedError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private TasksService: TasksService,
    private readonly taskStore: Store<TasksState>,
    private readonly boardStore: Store<BoardsState>,
    private readonly systemStore: Store<SystemState>,
    private toastr: ToastrService
  ) {}
}

const setUserId = (task: NewTask, id: string) => {
  const newTask = Object.assign({}, task);
  newTask.userId = id;
  return newTask;
};
