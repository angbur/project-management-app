import { createReducer, on } from '@ngrx/store';
import { Column } from 'src/app/_services/columns/column.model';
import * as ColumnsActions from './columns.actions';

const createColumn = (columns: Column[] | null, column: Column) => [...columns as Column[], column];
export interface ColumnsState {
  columns: Column[];
}

export const initialState: ColumnsState = {
  columns: [],
};

export const columnsReducers = createReducer(
  initialState,
  on(ColumnsActions.loadColumns, state => ({ ...state, columns: state.columns })),
  on(ColumnsActions.columnsLoaded, (state, { columns }) => ({ columns: columns })),
  on(ColumnsActions.columnAdded, (state, {column}) => ({
    ...state,
    columns: createColumn(state.columns, column),
  })),
  on(ColumnsActions.addColumn, state => ({ ...state, columns: state.columns })),
);

export const getColumns = (state: ColumnsState) => state.columns;
