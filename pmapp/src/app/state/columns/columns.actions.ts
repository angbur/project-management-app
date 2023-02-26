import { createAction, props } from '@ngrx/store';
import { requestError } from 'types';
import { Column } from '_services/columns/column.model';

export const loadColumns = createAction('[Columns] Load Data');

export const columnsLoaded = createAction('[Columns] Data Loaded', props<{ columns: Column[] }>());

export const columnsLoadedError = createAction('[Columns] Loaded Error', props<{ error: requestError }>());

export const addColumn = createAction('[Columns] Add Data', props<{ column: Column }>());

export const columnAdded = createAction('[Columns] Data Added', props<{ column: Column }>());

export const columnAddedError = createAction('[Columns] Error Added', props<{ error: requestError }>());

export const deleteColumn = createAction('[Columns] Delete Data');

export const ColumnDeleted = createAction('[Columns] Column Deleted]');

export const ColumnDeletedError = createAction('[Columns] Error Delete');

export const clearColumns = createAction('[Columns] Clear Data');
