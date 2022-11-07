import { getSelectBoardTitle, getBoardsStatus } from './../../../state/boards/boards.reducer';
import { addColumn } from './../../../state/columns/columns.actions';
import { NewColumnModalComponent } from './components/new-column-modal/new-column-modal.component';
import { getActualColumnsList, getActualTasksList, getActualBoardId } from './../../../state/index';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadColumns } from 'src/app/state/columns/columns.actions';
import { ColumnsState } from 'src/app/state/columns/columns.reducer';
import { Column } from 'src/app/_services/columns/column.model';
import { loadTasks } from 'src/app/state/tasks/tasks.actions';
import { Task } from 'src/app/_services/tasks/task.model';
import { MatDialog } from '@angular/material/dialog';
import { BoardsState } from 'src/app/state/boards/boards.reducer';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  //projectTitle$: Observable<string>;
  columns$: Observable<Column[]>;
  tasks$: Observable<Task[]>;
  newColumn: Column = {
    _id: 0,
    title: '',
    order: 0,
    boardId: ''
  };

  constructor(
    private readonly columnsStore: Store<ColumnsState>,
    private readonly boardStore: Store<BoardsState>,
    public dialog: MatDialog,
    ) {
    //this.projectTitle$ = this.boardStore.select(getSelectBoardTitle) || of('Project');
    this.columns$ = columnsStore.pipe(select(getActualColumnsList));
    this.tasks$ = columnsStore.pipe(select(getActualTasksList));
  };

  ngOnInit(): void {
    this.columnsStore.dispatch(loadColumns());
    this.columnsStore.dispatch(loadTasks());
  };

  addNewColumn(){
    const dialogRef = this.dialog.open(NewColumnModalComponent, {
      width: '250px',
      data: this.newColumn.title,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.columns$.subscribe(columns => this.newColumn.order = columns.length);
      this.boardStore.pipe(select(getActualBoardId)).subscribe(id=> this.newColumn.boardId = id as string);
      this.newColumn.title = result;
      if (result) this.columnsStore.dispatch(addColumn({column: this.newColumn}));
    });
  };
};
