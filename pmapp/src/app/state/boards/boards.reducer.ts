import { Board } from '../../_services/board/board.model';
import { BoardsActions, BoardsActionTypes } from './boards.actions';

export const initialBoard: Board[] = [{
  _id: '',
  title: '',
  owner: '',
  users: []
}];

const createBoard = (boards: Board[], board: Board) => [...boards, board];
const updateBoard = (boards: Board[], board: Board) => boards.map(p => {
  return p._id === board._id ? Object.assign({}, board) : p;
});
const deleteBoard = (boards: Board[], board: Board) => boards.filter(w => board._id !== w._id);

export interface BoardsState {
  boards: Board[],
  selectedBoardId: string | null;
};

export const initialState: BoardsState = {
  boards: initialBoard,
  selectedBoardId: null
};

export function boardsReducers(
  state = initialState, action: BoardsActions): BoardsState {
  switch (action.type) {
    case BoardsActionTypes.BoardSelected:
      return {
        selectedBoardId: action.payload._id,
        boards: state.boards
      }
    case BoardsActionTypes.AddBoard:
      return {
        selectedBoardId: state.selectedBoardId,
        boards: createBoard(state.boards, action.payload)
      }
    case BoardsActionTypes.UpdateBoard:
      return {
        selectedBoardId: state.selectedBoardId,
        boards: updateBoard(state.boards, action.payload)
      }
    case BoardsActionTypes.DeleteBoard:
      return {
        selectedBoardId: state.selectedBoardId,
        boards: deleteBoard(state.boards, action.payload)
      }
    default:
      return state;
  }
};

export const getSelectedBoardId = (state: BoardsState) => state.selectedBoardId;
export const getBoardsForUser = (state: BoardsState) => state.boards;