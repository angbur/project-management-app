import { ColumnsService } from './../../_services/columns/columns.service';
import { getActualBoardId } from './../index';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { ColumnsState } from './columns.reducer';
import { of } from 'rxjs';

@Injectable()
export class ColumnsEffects {
  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[Columns] Load Data'),
      withLatestFrom(this.store.select(getActualBoardId)),
      mergeMap(([, boardId]) =>
        this.ColumnsService.getColumnsInBoard(boardId as string).pipe(
          map(columns => ({ type: '[Columns] Data Loaded', columns: columns })),
          catchError(() => of({ type: '[Columns] Loaded Error' }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ColumnsService: ColumnsService,
    private readonly store: Store<ColumnsState>
  ) {}
}
