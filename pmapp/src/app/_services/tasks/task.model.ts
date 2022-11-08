export interface Task {
  _id: string;
  title: string;
  order: number;
  description: string;
  userId: string;
  boardId: string;
  columnId: number;
  users: string[];
}

interface TasksList {
  tasks: Task[];
}

export interface TasksEntities {
  [P: number]: TasksList;
}

interface TaskMeta {
  _id: string;
  order: number;
  columnId: number;
}

export type TaskSet = TaskMeta[];

export interface NewTask {
  title: string;
  order: number;
  description: string;
  userId: string;
  users: string[];
}
