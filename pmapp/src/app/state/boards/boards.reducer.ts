import { createReducer, on } from '@ngrx/store';
import { Board } from '../../_services/board/board.model';
import * as BoardsActions from './boards.actions';

export const initialBoard: Board[] = [
  {
    _id: '',
    title: '',
    owner: '',
    users: [],
  },
];

const createBoard = (boards: Board[], board: Board) => [...boards, board];
const updateBoard = (boards: Board[], board: Board) =>
  boards.map(p => {
    return p._id === board._id ? Object.assign({}, board) : p;
  });
const deleteBoard = (boards: Board[], id: string) => boards.filter(w => id !== w._id);

export interface BoardsState {
  boards: Board[];
  selectedBoardId: string | null;
}

export const initialState: BoardsState = {
  boards: initialBoard,
  selectedBoardId: null,
};

export const boardsReducers = createReducer(
  initialState,
  on(BoardsActions.loadBoards, state => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: state.boards,
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
    boards: updateBoard(state.boards, board),
  })),
  on(BoardsActions.deleteBoard, (state, { boardId }) => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: deleteBoard(state.boards, boardId),
  })),
  on(BoardsActions.boardsLoaded, (state, { boards }) => ({
    ...state,
    selectedBoardId: state.selectedBoardId,
    boards: boards,
  }))
);

export const getSelectedBoardId = (state: BoardsState) => state.selectedBoardId;
export const getBoardsForUser = (state: BoardsState) => state.boards;
