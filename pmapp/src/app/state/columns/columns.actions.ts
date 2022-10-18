import { createAction, props } from "@ngrx/store";
import { Column } from "src/app/_services/columns/column.model";

export const loadColumns = createAction('[Columns] Load Data');

export const columnsLoaded = createAction(
  '[Columns] Data Loaded',
  props<{columns: Column[]}>());

export const columnsLoadedError = createAction('[Columns] Loaded Error');

export const addColumn = createAction('[Columns] Add Data');

export const columnAdded = createAction(
  '[Columns] Data Added',
  props<{column: Column}>());

export const columnAddedError = createAction(
  '[Columns] Error Added',
  props<{error: string}>());

export const deleteColumn = createAction('[Columns] Delete Data');

export const ColumnDeleted = createAction('[Columns] Column Deleted]');

export const ColumnDeletedError = createAction('[Columns] Error Delete');

