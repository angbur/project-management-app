import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { ColumnsService } from './../../_services/columns/columns.service';
import { getActualBoardId } from './../index';
import { ColumnsState } from './columns.reducer';
import * as ColumnsActions from './columns.actions';
import { Column } from '../../_services/columns/column.model';

@Injectable()
export class ColumnsEffects {
  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.loadColumns),
      withLatestFrom(this.store.select(getActualBoardId)),
      mergeMap(([, boardId]) =>
        this.ColumnsService.getColumnsInBoard(boardId as string).pipe(
          map((columns: any) => (ColumnsActions.columnsLoaded({columns: columns as Column[] })),
          catchError((error) => of(ColumnsActions.columnsLoadedError({error})))
        )
      )
    )
  ));

  addColumn$ = createEffect(() =>
  this.actions$.pipe(
    ofType(ColumnsActions.addColumn),
    withLatestFrom(this.store.select(getActualBoardId)),
      mergeMap(([action,boardId]) =>
      this.ColumnsService.createColumnInBoard({title: action.column.title, order: action.column.order}, boardId as string).pipe(
        map((data) => ColumnsActions.columnAdded({column: data as Column})),
        catchError(error => of(ColumnsActions.columnAddedError({ error })))
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

