import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, withLatestFrom } from 'rxjs/operators';

import { BoardsService } from '../../_services/board/boards.service';
import { getUserId, SystemState } from '../system/system.reducer';
import { BoardsActionTypes, BoardsLoaded } from './boards.actions';

@Injectable({providedIn: 'root'})
export class BoardsEffects {

  loadBoards$ =  createEffect(() => this.actions$.pipe(
    ofType(BoardsActionTypes.LoadBoards),
    withLatestFrom(this.store.select(getUserId)),
    mergeMap(([action, userId]) => 
    this.BoardsService.getAllBoardsForUser(userId as string)
      .pipe(
        map(boards => new BoardsLoaded(boards)),
        catchError(() => of({ type: 'Boards Loaded Error' }))
      )
      )
    )
  );

  //addBoard$ = createEffect(() =>

  //updateBoard$ = createEffect(() =>

  //deleteBoard$ = createEffect(() =>

  constructor(
    private actions$: Actions,
    private BoardsService: BoardsService,
    private readonly store: Store<SystemState>
  ) {
  }
}
