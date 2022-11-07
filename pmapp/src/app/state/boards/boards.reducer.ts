import { createReducer, on } from '@ngrx/store';
import { requestStatus } from 'src/app/types';
import { Board } from '../../_services/board/board.model';
import * as BoardsActions from './boards.actions';

const createBoard = (boards: Board[] | null, board: Board) => boards ? [ ...boards, board] : [board];
const updateBoard = (boards: Board[], board: Board) =>
  boards.map(p => {
    return p._id === board._id ? Object.assign({}, board) : p;
  });
const deleteBoard = (boards: Board[], id: string) => boards.filter(w => id !== w._id);

export interface BoardsState {
  boards: Board[] | null;
  selectedBoardId: string | null;
  status: requestStatus;
  error: Error | null,
}

export const initialState: BoardsState = {
  boards: null,
  selectedBoardId: null,
  status: 'idle',
  error: null,
};

export const boardsReducers = createReducer(
  initialState,
  on(BoardsActions.loadBoards, state => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: state.boards,
    status: 'loading...',
  })),
  on(BoardsActions.loadBoardsError, (state, { error }) => ({
    ...state,
    error: error,
    status: 'failed :('
  })),
  on(BoardsActions.boardsLoaded, (state, { boards }) => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: boards,
    status: 'succeeded (:',
  })),
  on(BoardsActions.selectedBoard, (state, { board }) => ({
    ...state,
    selectedBoardId: board._id as string,
    boards: state.boards,
  })),
  on(BoardsActions.addBoard, (state, { board }) => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: createBoard(state.boards, board),
  })),
  on(BoardsActions.updateBoard, (state, { board }) => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: updateBoard(state.boards as Board[], board),
  })),
  on(BoardsActions.boardDeleted, (state, { boardId }) => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: deleteBoard(state.boards as Board[], boardId),
  })),
);

export const getSelectedBoardId = (state: BoardsState) => state.selectedBoardId;
export const getSelectBoardTitle = (state: BoardsState) => state.boards && state.boards.find(board => board._id === state.selectedBoardId)?.title;
export const getBoardsForUser = (state: BoardsState) => state.boards;
export const getBoardsStatus = (state: BoardsState) => state.status;
