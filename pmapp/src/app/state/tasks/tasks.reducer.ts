import { createReducer, on } from '@ngrx/store';
import * as TasksActions from './tasks.actions';
import { Task } from 'src/app/_services/tasks/task.model';

export interface TasksState {
  tasks: Task[];
}

export const initialState: TasksState = {
  tasks: [],
};

export const tasksReducers = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.tasksLoaded, (state, { tasks }) => ({ tasks: tasks })),
  on(TasksActions.updateTasksSet, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.tasksSetUpdated, (state, { tasks }) => ({ tasks: tasks }))
);

export const getTasks = (state: TasksState) => state.tasks;
