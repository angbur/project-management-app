import { Board } from '../../_services/board/board.model';
import { BoardsActionTypes } from './boards.actions';

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
const deleteBoard = (boards: Board[], id: string) => boards.filter(w => id!== w._id);

export interface BoardsState {
  boards: Board[],
  selectedBoardId: string | null;
};

export const initialState: BoardsState = {
  boards: initialBoard,
  selectedBoardId: null
};

export function boardsReducers(
  state = initialState, action: any): BoardsState {
  switch (action.type) {
    case BoardsActionTypes.LoadBoards:
      return {
        selectedBoardId: state.selectedBoardId,
        boards: state.boards
      }
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
    case BoardsActionTypes.BoardsLoaded:
      return {
        selectedBoardId: state.selectedBoardId,
        boards: action.payload
      }
    default:
      return state;
  }
};

export const getSelectedBoardId = (state: BoardsState) => state.selectedBoardId;
export const getBoardsForUser = (state: BoardsState) => state.boards;
