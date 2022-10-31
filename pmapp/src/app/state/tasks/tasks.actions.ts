import { TaskSet } from './../../_services/tasks/task.model';
import { createAction, props } from '@ngrx/store';
import { Task } from 'src/app/_services/tasks/task.model';

export const loadTasks = createAction('[Tasks] Load Data');

export const tasksLoaded = createAction('[Tasks] Data Loaded', props<{ tasks: Task[] }>());

export const tasksLoadedError = createAction('[Tasks] Loaded Error', props<{ error: Error }>());

export const addTask = createAction('[Tasks] Add Data');

export const taskAdded = createAction('[Tasks] Data Added', props<{ tasks: Task }>());

export const taskAddedError = createAction('[Tasks] Error Added', props<{ error: string }>());

export const deleteTask = createAction('[Tasks] Delete Data');

export const taskDeleted = createAction('[Tasks] Task Deleted]');

export const taskDeletedError = createAction('[Tasks] Error Delete');

export const updateTask = createAction('[Tasks] Update Task', props<{ task: Task }>());

export const taskUpdated = createAction('[Tasks] Task Updated');

export const updateTasksSet = createAction('[Tasks] Update TasksSet', props<{ tasks: TaskSet }>());

export const tasksSetUpdated = createAction('[Tasks] TasksSet Updated', props<{ tasks: Task[] }>());

export const tasksSetUpdatedError = createAction('[Tasks] Error TasksSet Updated', props<{ error: Error }>());
