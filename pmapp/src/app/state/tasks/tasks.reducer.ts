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

const deleteTask = (tasks: Task[], task: Task) => tasks.filter(w => task._id !== w._id);
const updateTask = (tasks: Task[], task: Task) =>
  tasks.map(p => {
    return p._id === task._id ? Object.assign({}, task) : p;
  });

export const tasksReducers = createReducer(
  initialState,
  on(TasksActions.loadTasks, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.tasksLoaded, (state, { tasks }) => ({ ...state, tasks: tasks })),
  on(TasksActions.updateTasksSet, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.tasksSetUpdated, (state, { tasks }) => ({ ...state, tasks: tasks })),
  on(TasksActions.addTask, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.taskAdded, (state, { task }) => ({ ...state, tasks: [...state.tasks, task] })),
  on(TasksActions.taskAddedError, (state, { error }) => ({ ...state, error: error })),
  on(TasksActions.deleteTask, state => ({ ...state, tasks: state.tasks })),
  on(TasksActions.taskDeleted, (state, { task }) => ({ ...state, tasks: deleteTask(state.tasks, task) })),
  on(TasksActions.taskDeletedError, (state, { error }) => ({ ...state, error: error })),
  on(TasksActions.taskUpdated, (state, { task }) => ({ ...state, tasks: updateTask(state.tasks, task) }))
);

export const getTasks = (state: TasksState) => state.tasks;
