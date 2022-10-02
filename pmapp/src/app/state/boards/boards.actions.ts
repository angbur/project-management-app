import { Action } from '@ngrx/store';
import { Board } from '../../_services/board/board.model';

export enum BoardsActionTypes {
  BoardSelected = '[Boards] Selected',
  LoadBoards = '[Boards] Load Data',
  BoardsLoaded = '[Boards] Data Loaded',
  AddBoard = '[Boards] Add Data',
  BoardAdded = '[Boards] Data Added',
  UpdateBoard = '[Boards] Update Data',
  BoardUpdated = '[Boards] Data Updated',
  DeleteBoard = '[Boards] Delete Data',
  BoardDeleted = '[Boards] Delete Data'
};

export class SelectBoard implements Action {
  readonly type = BoardsActionTypes.BoardSelected;
  constructor(public payload: Board) { };
};

export class LoadBoards implements Action {
  readonly type = BoardsActionTypes.LoadBoards;
 // constructor(public payload: Board[]) { };
};

export class BoardsLoaded implements Action {
  readonly type = BoardsActionTypes.BoardsLoaded;
  constructor(public payload: Board[]) { };
};

export class AddBoard implements Action {
  readonly type = BoardsActionTypes.AddBoard;
  constructor(public payload: Board) { };
};

export class BoardAdded implements Action {
  readonly type = BoardsActionTypes.BoardAdded;
  constructor(public payload: Board) { };
};

export class UpdateBoard implements Action {
  readonly type = BoardsActionTypes.UpdateBoard;
  constructor(public payload: Board) { };
};

export class BoardUpdated implements Action {
  readonly type = BoardsActionTypes.BoardUpdated;
  constructor(public payload: Board) { };
};

export class DeleteBoard implements Action {
  readonly type = BoardsActionTypes.DeleteBoard;
  constructor(public payload: Board) { };
};

export class BoardDeleted implements Action {
  readonly type = BoardsActionTypes.BoardDeleted;
  constructor(public payload: Board) { };
};

export type BoardsActions = SelectBoard
  | LoadBoards
  | BoardsLoaded
  | AddBoard
  | BoardAdded
  | UpdateBoard
  | BoardUpdated
  | DeleteBoard
  | BoardDeleted
;
