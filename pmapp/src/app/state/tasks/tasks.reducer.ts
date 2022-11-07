import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from 'src/app/_services/tasks/task.model';

export interface TasksState {
  tasks: Task[];
  error: Error | null;
}

export const initialState: TasksState = {
  tasks: [],
  error: null,
};

export const tasksReducers = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.tasksLoaded, (state, { tasks }) => ({...state,  tasks: tasks })),
  on(TasksActions.updateTasksSet, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.tasksSetUpdated, (state, { tasks }) => ({...state, tasks: tasks })),
  on(TasksActions.addTask, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.taskAdded, (state, {task}) => ({...state, tasks: [...state.tasks, task]})),
  on(TasksActions.taskAddedError, (state, {error}) => ({...state, error: error}))
);

export const getTasks = (state: TasksState) => state.tasks;
