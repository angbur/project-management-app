import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBoards from './boards/boards.reducer';
import * as fromSystem from './system/system.reducer';
import * as fromUser from './user/user.reducer';

export interface AppState {
  boards: fromBoards.BoardsState,
  system: fromSystem.SystemState,
  user: fromUser.UserState
};

export const reducers: ActionReducerMap<AppState> = {
  boards: fromBoards.boardsReducers,
  system: fromSystem.systemReducers,
  user: fromUser.userReducers
};

export const selectBoardState
  = createFeatureSelector<fromBoards.BoardsState>('boards');

export const selectAllBoards = createSelector(
  selectBoardState,
  fromBoards.getBoardsForUser
);

export const selectSystemState
  = createFeatureSelector<fromSystem.SystemState>('system');

export const selectUserState
  = createFeatureSelector<fromUser.UserState>('user');
