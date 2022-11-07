import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { TasksState } from './tasks.reducer';
import { of } from 'rxjs';
import * as TasksActions from './tasks.actions';
import { NewTask, Task } from 'src/app/_services/tasks/task.model';
import { TasksService } from './../../_services/tasks/tasks.service';
import { getActualBoardId, selectUserId } from './../index';
import { ColumnsState } from '../columns/columns.reducer';
import { SystemState } from '../system/system.reducer';
import { ToastrService } from 'ngx-toastr';

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

  updateTask$ = createEffect(() =>
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
      withLatestFrom(this.boardStore.select(getActualBoardId),
        this.systemStore.select(selectUserId)),
      mergeMap(([action, boardId, userId]) =>
        this.TasksService.createTaskInColumn(setUserId(action.task,
        isString(userId) ? userId : ''),
        isString(boardId) ? boardId : '',
        action.colId)
        .pipe(
        map((data) => TasksActions.taskAdded({task: data as Task})),
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



  constructor(
    private actions$: Actions,
    private TasksService: TasksService,
    private readonly taskStore: Store<TasksState>,
    private readonly boardStore: Store<BoardsState>,
    private readonly columnStore: Store<ColumnsState>,
    private readonly systemStore: Store<SystemState>,
    private toastr: ToastrService
  ) {}
};

const setUserId = (task: NewTask, id: string) => {
  const newTask = Object.assign({}, task);
  newTask.userId = id;
  return newTask;
};

function isString (value: string | null): value is string {
  return (value as string) !== null ;
};
