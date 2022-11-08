import { Injectable } from '@angular/core';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { Store } from '@ngrx/store';

import { ColumnsService } from './../../_services/columns/columns.service';
import { getActualBoardId, getOrderToNewColumn } from './../index';
import { ColumnsState } from './columns.reducer';
import * as ColumnsActions from './columns.actions';
import { Column } from '../../_services/columns/column.model';
import { BoardsState } from '../boards/boards.reducer';
import { isString } from '../type.guard';

@Injectable()
export class ColumnsEffects {
  loadColumns$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.loadColumns),
      withLatestFrom(this.boardStore.select(getActualBoardId)),
      mergeMap(([, boardId]) =>
        this.ColumnsService.getColumnsInBoard(isString(boardId) ? boardId : '').pipe(
          map(
            (columns: any) => ColumnsActions.columnsLoaded({ columns: columns as Column[] }),
            catchError(error => of(ColumnsActions.columnsLoadedError({ error })))
          )
        )
      )
    )
  );

  addColumn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ColumnsActions.addColumn),
      withLatestFrom(this.boardStore.select(getActualBoardId), this.columnStore.select(getOrderToNewColumn)),
      mergeMap(([action, boardId, order]) =>
        this.ColumnsService.createColumnInBoard(
          { title: action.column.title, order: order },
          isString(boardId) ? boardId : ''
        ).pipe(
          map(data => ColumnsActions.columnAdded({ column: data as Column })),
          catchError(error => of(ColumnsActions.columnAddedError({ error })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private ColumnsService: ColumnsService,
    private readonly columnStore: Store<ColumnsState>,
    private readonly boardStore: Store<BoardsState>
  ) {}
}
