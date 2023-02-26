import { createAction, props } from '@ngrx/store';
import { requestError } from 'types';
import { Board } from '_services/board/board.model';

export const selectedBoard = createAction('[Boards] Selected Board', props<{ board: Board }>());

export const loadBoards = createAction('[Boards] Load Data');

export const boardsLoaded = createAction('[Boards] Data Loaded', props<{ boards: Board[] }>());

export const loadBoardsError = createAction('[Boards] Load Error', props<{ error: requestError }>());

export const addBoard = createAction('[Boards] Add Data', props<{ board: Board }>());

export const boardAdded = createAction('[Boards] Data Added');

export const boardAddedError = createAction('[Boards] Added Error', props<{ error: requestError }>());

export const updateBoard = createAction('[Boards] Update Data', props<{ board: Board }>());

export const boardUpdated = createAction('[Boards] Data Updated');

export const deleteBoard = createAction('[Boards] Delete Data', props<{ boardId: string }>());

export const boardDeleted = createAction('[Boards] Delete Data', props<{ boardId: string }>());

export const boardDeletedError = createAction('[Boards] Deleted Error', props<{ error: requestError }>());

export const clearSelectedBoards = createAction('[Boards] Clear Selected Board');
