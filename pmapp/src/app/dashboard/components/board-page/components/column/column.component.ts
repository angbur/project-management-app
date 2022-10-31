import { Store } from '@ngrx/store';
import { TaskSet } from './../../../../../_services/tasks/task.model';
import { updateTasksSet } from 'src/app/state/tasks/tasks.actions';
import { Component, Input, OnChanges } from '@angular/core';
import { Column } from 'src/app/_services/columns/column.model';
import { Task, TasksEntities } from 'src/app/_services/tasks/task.model';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnChanges {
  @Input()
  columns: Column[] | null = null;

  @Input()
  tasks: Task[] | null = null;

  columnsIds: number[] = [];

  tasksEntities: TasksEntities = {};

  constructor(private readonly store: Store<TaskState>) {}

  ngOnChanges(): void {
    if (isColumns(this.columns) && isTasks(this.tasks)) {
      this.columnsIds = Array.from({ length: this.columns.length }, (v, i) => i);

      for (const colId of this.columnsIds) {
        this.tasksEntities[colId] = {
          tasks: [],
        };

        for (const taskId in this.tasks) {
          if (this.tasks[taskId].columnId === this.columns[colId]._id) {
            this.tasksEntities[colId].tasks.push(this.tasks[taskId]);
          }
        }

        this.tasksEntities[colId].tasks.sort((a, b) => a.order - b.order);
      }
    }
  }

  dropTask(event: CdkDragDrop<Task[]>) {
    const previousColumnIndex: number = ColumnComponent.getNumberOfColumn(event.previousContainer.id);
    const newColumnIndex: number = ColumnComponent.getNumberOfColumn(event.container.id);

    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.setNewOrderForTasks(newColumnIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
      this.setNewTasksSetInColumn(previousColumnIndex, newColumnIndex);
    }
  }

  setNewTasksSetInColumn(prevId: number, newId: number) {
    this.setNewOrderForTasks(prevId);
    this.setNewColumnId(newId);
    this.setNewOrderForTasks(newId);
    this.updateNewTasks(this.tasksEntities);
  }

  setNewOrderForTasks(id: number) {
    let arr = Array.from(this.tasksEntities[id].tasks);
    let newTasksList: Task[] = [];

    for (let i = 0; i < arr.length; i += 1) {
      const newTask: Task = Object.assign({}, arr[i]);
      newTask.order = i;
      newTasksList.push(newTask);
    }

    newTasksList.sort((a, b) => a.order - b.order);
    this.tasksEntities[id].tasks = newTasksList;
  }

  setNewColumnId(colId: number) {
    let arr = Array.from(this.tasksEntities[colId].tasks);
    let newTasksList: Task[] = [];

    if (isColumns(this.columns)) {
      for (let i = 0; i < arr.length; i += 1) {
        const newTask: Task = Object.assign({}, arr[i]);
        newTask.columnId = this.columns[colId]._id;
        newTasksList.push(newTask);
      }
    }
    this.tasksEntities[colId].tasks = newTasksList;
  }

  updateNewTasks(tasksEntities: TasksEntities) {
    let newTasks: Task[] = [];
    let taskSetData: TaskSet = [];

    for (let taskSet in tasksEntities) {
      newTasks = [...newTasks, ...tasksEntities[taskSet].tasks];
    }

    for (let task of newTasks) {
      const { title, description, userId, boardId, users, ...taskDataToUpdate } = task;
      taskSetData = [...taskSetData, taskDataToUpdate];
    }

    this.store.dispatch(updateTasksSet({ tasks: taskSetData }));
  }

  static getNumberOfColumn(containerId: string) {
    return parseInt(containerId.split('-').reverse()[0]);
  }
}

export function isTasks(tasks: Task[] | null): tasks is Task[] {
  return (tasks as Task[]) !== undefined && (tasks as Task[]) !== null && Array.isArray(tasks as Task[]);
}

export function isColumns(columns: Column[] | null): columns is Column[] {
  return (columns as Column[]) !== undefined && (columns as Column[]) !== null && Array.isArray(columns as Column[]);
}