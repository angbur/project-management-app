import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromBoards from './boards/boards.reducer';
import * as fromColumns from './columns/columns.reducer';
import * as fromSystem from './system/system.reducer';
import * as fromTasks from './tasks/tasks.reducer';

export interface AppState {
  boards: fromBoards.BoardsState;
  columns: fromColumns.ColumnsState;
  system: fromSystem.SystemState;
  tasks: fromTasks.TasksState;
}

export const reducers = {
  boards: fromBoards.boardsReducers,
  system: fromSystem.systemReducers,
  columns: fromColumns.columnsReducers,
  tasks: fromTasks.tasksReducers,
};

export const selectBoardState = createFeatureSelector<fromBoards.BoardsState>('boards');

export const selectAllBoards = createSelector(selectBoardState, fromBoards.getBoardsForUser);

export const selectSystemState = createFeatureSelector<fromSystem.SystemState>('system');

export const selectUserId = createSelector(selectSystemState, fromSystem.getUserId);

export const selectLoginStatus = createSelector(selectSystemState, fromSystem.getSystemStatus);

export const getActualBoardId = createSelector(selectBoardState, fromBoards.getSelectedBoardId);

export const getActualBoardTitle = createSelector(selectBoardState, fromBoards.getSelectBoardTitle);

export const selectActualBoardsStatus = createSelector(selectBoardState, fromBoards.getBoardsStatus);

export const selectColumnsState = createFeatureSelector<fromColumns.ColumnsState>('columns');

export const getActualColumnsList = createSelector(selectColumnsState, fromColumns.getColumns);

export const getOrderToNewColumn = createSelector(selectColumnsState, fromColumns.getColumnsLength);

export const selectTasksState = createFeatureSelector<fromTasks.TasksState>('tasks');

export const getActualTasksList = createSelector(selectTasksState, fromTasks.getTasks);
