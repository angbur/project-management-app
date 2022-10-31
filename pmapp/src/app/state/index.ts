import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBoards from './boards/boards.reducer';
import * as fromColumns from './columns/columns.reducer';
import * as fromSystem from './system/system.reducer';
import * as fromUser from './user/user.reducer';
import * as fromTasks from './tasks/tasks.reducer';

export interface AppState {
  boards: fromBoards.BoardsState;
  columns: fromColumns.ColumnsState;
  system: fromSystem.SystemState;
  user: fromUser.UserState;
  tasks: fromTasks.TasksState;
}

export const reducers = {
  boards: fromBoards.boardsReducers,
  system: fromSystem.systemReducers,
  columns: fromColumns.columnsReducers,
  user: fromUser.userReducers,
  tasks: fromTasks.tasksReducers,
};

export const selectBoardState = createFeatureSelector<fromBoards.BoardsState>('boards');

export const selectAllBoards = createSelector(selectBoardState, fromBoards.getBoardsForUser);

export const selectSystemState = createFeatureSelector<fromSystem.SystemState>('system');

export const selectUserId = createSelector(selectSystemState, fromSystem.getUserId);

export const selectLoginStatus = createSelector(selectSystemState, fromSystem.getSystemStatus);

export const selectUserState = createFeatureSelector<fromUser.UserState>('user');

export const getActualBoardId = createSelector(selectBoardState, fromBoards.getSelectedBoardId);

export const selectColumnsState = createFeatureSelector<fromColumns.ColumnsState>('columns');

export const getActualColumnsList = createSelector(selectColumnsState, fromColumns.getColumns);

export const selectTasksState = createFeatureSelector<fromTasks.TasksState>('tasks');

export const getActualTasksList = createSelector(selectTasksState, fromTasks.getTasks);
