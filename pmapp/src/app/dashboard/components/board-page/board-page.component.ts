import {
  getActualColumnsList,
  getActualTasksList,
  getActualBoardId,
  getActualBoardTitle,
} from './../../../state/index';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { loadColumns } from 'src/app/state/columns/columns.actions';
import { ColumnsState } from 'src/app/state/columns/columns.reducer';
import { Column } from 'src/app/_services/columns/column.model';
import { loadTasks } from 'src/app/state/tasks/tasks.actions';
import { Task } from 'src/app/_services/tasks/task.model';
import { MatDialog } from '@angular/material/dialog';
import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { addColumn } from './../../../state/columns/columns.actions';
import { NewColumnModalComponent } from './components/new-column-modal/new-column-modal.component';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  projectTitle$: Observable<string | null | undefined>;
  columns$: Observable<Column[]>;
  tasks$: Observable<Task[]>;

  constructor(
    private readonly columnsStore: Store<ColumnsState>,
    private readonly boardStore: Store<BoardsState>,
    public dialog: MatDialog
  ) {
    this.columns$ = columnsStore.pipe(select(getActualColumnsList));
    this.tasks$ = columnsStore.pipe(select(getActualTasksList));
    this.projectTitle$ = this.boardStore.select(getActualBoardTitle);
  }

  ngOnInit(): void {
    this.columnsStore.dispatch(loadColumns());
    this.columnsStore.dispatch(loadTasks());
  }

  addNewColumn() {
    const newColumn: Column = {
      _id: 0,
      title: '',
      order: 0,
      boardId: '',
    };
    const dialogRef = this.dialog.open(NewColumnModalComponent, {
      width: '250px',
      data: newColumn.title,
    });

    dialogRef.afterClosed().subscribe(result => {
      newColumn.title = result;
      if (result) this.columnsStore.dispatch(addColumn({ column: newColumn }));
    });
  }

  editProjectTitle() {}
}
