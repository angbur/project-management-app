import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { BoardsService } from '../../_services/board/boards.service';
import { BoardsActionTypes, BoardsLoaded } from './boards.actions';

@Injectable({providedIn: 'root'})
export class BoardsEffects {
  userId = '6328b36a7186401e9538ccfa';

  loadBoards$ =  createEffect(() => this.actions$.pipe(
    ofType(BoardsActionTypes.LoadBoards),
    mergeMap(() => this.BoardsService.getAllBoardsForUser(this.userId)
      .pipe(
        map(boards => new BoardsLoaded(boards)),
        catchError(() => of({ type: 'Boards Loaded Error' }))
      ))
    )
  );

  //addBoard$ = createEffect(() =>

  //updateBoard$ = createEffect(() =>

  //deleteBoard$ = createEffect(() =>

  constructor(
    private actions$: Actions,
    private BoardsService: BoardsService
  ) {}
}
