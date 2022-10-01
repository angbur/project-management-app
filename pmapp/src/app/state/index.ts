import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import { BoardsActions } from './boards/boards.actions';

import * as fromBoards from './boards/boards.reducer';

export interface AppState {
  boards: fromBoards.BoardsState
}

export const reducers: ActionReducerMap<AppState, BoardsActions> = {
  boards: fromBoards.boardsReducers
};

export const selectBoardState
  = createFeatureSelector<fromBoards.BoardsState>('boards');

export const selectAllBoards = createSelector(
  selectBoardState,
  fromBoards.getBoardsForUser
);
