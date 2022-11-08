import { TaskSet, NewTask } from 'src/app/_services/tasks/task.model';
import { updateTask } from './../../../../../state/tasks/tasks.actions';
import { Component, Input, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Column } from 'src/app/_services/columns/column.model';
import { Task, TasksEntities } from 'src/app/_services/tasks/task.model';
import { NewTaskModalComponent } from '../new-task-modal/new-task-modal.component';
import { isColumns, isTasks } from './type.guard';
import { addTask, deleteTask, updateTasksSet } from 'src/app/state/tasks/tasks.actions';
import { UpdateTaskModalComponent } from '../update-task-modal/update-task-modal.component';

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
  newTask: NewTask = {
    title: '',
    order: 0,
    description: 'some description',
    userId: '',
    users: [],
  };

  constructor(private readonly store: Store<TaskState>, public dialog: MatDialog) {}

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
    const previousColumnIndex: number = parseInt(
      event.previousContainer.element.nativeElement.dataset['colorder'] as string
    );
    const newColumnIndex: number = parseInt(event.container.element.nativeElement.dataset['colorder'] as string);

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
    if (this.tasksEntities[id]) {
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
  }

  setNewColumnId(colId: number) {
    if (this.tasksEntities[colId]) {
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
    } else console.log(this.tasksEntities, colId);
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

  addNewTask(colId: string, colNumber: number) {
    const dialogRef = this.dialog.open(NewTaskModalComponent, {
      width: '250px',
      data: this.newTask.title,
    });

    dialogRef.afterClosed().subscribe(result => {
      const newOrder: number = this.tasksEntities[colNumber].tasks.length;
      const task = Object.assign({}, this.newTask);
      task.order = JSON.parse(JSON.stringify(newOrder));
      task.title = JSON.parse(JSON.stringify(result));
      if (result) this.store.dispatch(addTask({ task: task, colId: colId }));
    });
  }

  delete(colId: string, taskId: string) {
    this.store.dispatch(deleteTask({ colId: colId, taskId: taskId }));
  }

  update(colId: string, task: Task, taskId: string) {
    const { _id, boardId, ...rest } = task;
    const updatedTask: NewTask = Object.assign({}, rest);
    const dialogRef = this.dialog.open(UpdateTaskModalComponent, {
      width: '250px',
      data: task.title,
    });

    dialogRef.afterClosed().subscribe(result => {
      updatedTask.title = JSON.parse(JSON.stringify(result));
      if (result) this.store.dispatch(updateTask({ task: updatedTask, colId: colId, taskId: taskId }));
    });
  }
}
