import { TaskSet, NewTask } from '_services/tasks/task.model';
import { createAction, props } from '@ngrx/store';
import { Task } from '_services/tasks/task.model';
import { requestError } from 'types';

export const loadTasks = createAction('[Tasks] Load Data');

export const tasksLoaded = createAction('[Tasks] Data Loaded', props<{ tasks: Task[] }>());

export const tasksLoadedError = createAction('[Tasks] Loaded Error', props<{ error: Error }>());

export const addTask = createAction('[Tasks] Add Data', props<{ task: NewTask; colId: string }>());

export const taskAdded = createAction('[Tasks] Data Added', props<{ task: Task }>());

export const taskAddedError = createAction('[Tasks] Error Added', props<{ error: Error }>());

export const deleteTask = createAction('[Tasks] Delete Data', props<{ colId: string; taskId: string }>());

export const taskDeleted = createAction('[Tasks] Task Deleted]', props<{ task: Task }>());

export const taskDeletedError = createAction('[Tasks] Error Delete', props<{ error: Error }>());

export const updateTask = createAction(
  '[Tasks] Update Task',
  props<{ task: NewTask; colId: string; taskId: string }>()
);

export const taskUpdated = createAction('[Tasks] Task Updated', props<{ task: Task }>());

export const taskUpdatedError = createAction('[Tasks] Error Update', props<{ error: requestError }>());

export const updateTasksSet = createAction('[Tasks] Update TasksSet', props<{ tasks: TaskSet }>());

export const tasksSetUpdated = createAction('[Tasks] TasksSet Updated', props<{ tasks: Task[] }>());

export const tasksSetUpdatedError = createAction('[Tasks] Error TasksSet Updated', props<{ error: requestError }>());

export const clearTasks = createAction('[Tasks] Clear Data');
