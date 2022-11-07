import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { BoardsService } from 'src/app/_services/board/boards.service';
import { SystemState } from '../system/system.reducer';
import { selectUserId } from './../index';
import { Board } from 'src/app/_services/board/board.model';
import * as BoardsActions from './boards.actions';

@Injectable({ providedIn: 'root' })
export class BoardsEffects {
  loadBoards$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.loadBoards),
      withLatestFrom(this.store.select(selectUserId)),
      mergeMap(([, userId]) =>
        this.BoardsService.getAllBoardsForUser(userId as string).pipe(
          map((boards: Board[]) => BoardsActions.boardsLoaded({ boards })),
          catchError(() => of({ type: '[Boards] Loaded Error' }))
        )
      )
    )
  );

  addBoard$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BoardsActions.addBoard),
      mergeMap((data: any) =>
        this.BoardsService.createBoard(data.board).pipe(
          map(() => BoardsActions.boardAdded()),
          catchError((error: Error) => of(BoardsActions.boardAddedError({ error })))
        )
      )
    )
  );

  boardAddedSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardsActions.boardAdded),
        tap(() => {
          this.goToDashboardPage(), this.toastr.success('Board added!');
        })
      ),
    { dispatch: false }
  );

  boardAddedError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BoardsActions.boardAddedError),
        tap(() => {
          this.toastr.error('Failed!');
        })
      ),
    { dispatch: false }
  );

  deleteBoard$ = createEffect(() => this.actions$.pipe(
    ofType(BoardsActions.deleteBoard),
    mergeMap((data) =>
    this.BoardsService.deleteBoardById(data.boardId)
    .pipe(
      map((board) => BoardsActions.boardDeleted({ boardId: board._id })),
      catchError((error) => of( BoardsActions.boardDeletedError({error}))),
    )
    )
  ));

  goToDashboardPage(): void {
    this.router.navigate(['/dashboard']);
  }

  constructor(
    private actions$: Actions,
    private BoardsService: BoardsService,
    private readonly store: Store<SystemState>,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
