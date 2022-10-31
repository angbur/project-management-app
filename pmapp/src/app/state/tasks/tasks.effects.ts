import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { TasksState } from './tasks.reducer';
import { of } from 'rxjs';
import * as TasksActions from './tasks.actions';
import { Task } from 'src/app/_services/tasks/task.model';
import { TasksService } from './../../_services/tasks/tasks.service';
import { getActualBoardId } from './../index';

@Injectable()
export class TasksEffects {
  loadTasks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TasksActions.loadTasks),
      withLatestFrom(this.store.select(getActualBoardId)),
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

  constructor(
    private actions$: Actions,
    private TasksService: TasksService,
    private readonly store: Store<TasksState>
  ) {}
}
