import { selectUserId } from './../index';
import { AddBoard } from 'src/app/state/boards/boards.actions';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';

import { BoardsService } from '../../_services/board/boards.service';
import { SystemState } from '../system/system.reducer';
import { BoardsActionTypes, BoardsLoaded, BoardAdded, BoardAddedError } from './boards.actions';
import { Board } from 'src/app/_services/board/board.model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Injectable({providedIn: 'root'})
export class BoardsEffects {

  loadBoards$ =  createEffect(() => this.actions$.pipe(
    ofType(BoardsActionTypes.LoadBoards),
    withLatestFrom(this.store.select(selectUserId)),
    mergeMap(([action, userId]) =>
    this.BoardsService.getAllBoardsForUser(userId as string)
      .pipe(
        map((boards: Board[]) => new BoardsLoaded(boards)),
        catchError(() => of({ type: 'Boards Loaded Error' }))
      )
    )
  ));

  addBoard$ = createEffect(() => this.actions$.pipe(
    ofType<AddBoard>(BoardsActionTypes.AddBoard),
    mergeMap((action) =>
    this.BoardsService.createBoard(action.payload)
    .pipe(
      map(() => new BoardAdded()),
      catchError((error) => of(new BoardAddedError(error.status))),
    )
    )
  ));

  boardAddedSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(BoardsActionTypes.BoardAdded),
    tap(() => {
      this.goToDashboardPage(),
      this.toastr.success('Board added!')})
  ), { dispatch: false }
  );

  boardAddedError$ = createEffect(() => this.actions$.pipe(
    ofType(BoardsActionTypes.BoardAddedError),
    tap(() => {
      this.toastr.error('Failed!')})
  ), { dispatch: false }
  );

  //updateBoard$ = createEffect(() =>

  //deleteBoard$ = createEffect(() =>

  goToDashboardPage(): void {
    this.router.navigate(['/dashboard']);
  }

  constructor(
    private actions$: Actions,
    private BoardsService: BoardsService,
    private readonly store: Store<SystemState>,
    private router: Router,
    private toastr: ToastrService
  ) {
  }
}
