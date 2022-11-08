import { Column } from 'src/app/_services/columns/column.model';
import { Task } from 'src/app/_services/tasks/task.model';

export function isTasks(tasks: Task[] | null): tasks is Task[] {
  return (tasks as Task[]) !== undefined && (tasks as Task[]) !== null && Array.isArray(tasks as Task[]);
}

export function isColumns(columns: Column[] | null): columns is Column[] {
  return (columns as Column[]) !== undefined && (columns as Column[]) !== null && Array.isArray(columns as Column[]);
}
