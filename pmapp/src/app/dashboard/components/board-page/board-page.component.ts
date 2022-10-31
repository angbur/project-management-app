import { getActualColumnsList, getActualTasksList } from './../../../state/index';
import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { loadColumns } from 'src/app/state/columns/columns.actions';
import { ColumnsState } from 'src/app/state/columns/columns.reducer';
import { Column } from 'src/app/_services/columns/column.model';
import { loadTasks } from 'src/app/state/tasks/tasks.actions';
import { Task } from 'src/app/_services/tasks/task.model';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss'],
})
export class BoardPageComponent implements OnInit {
  columns$: Observable<Column[]>;
  tasks$: Observable<Task[]>;

  constructor(private readonly store: Store<ColumnsState>) {
    this.columns$ = store.pipe(select(getActualColumnsList));
    this.tasks$ = store.pipe(select(getActualTasksList));
  }

  ngOnInit(): void {
    this.store.dispatch(loadColumns());
    this.store.dispatch(loadTasks());
  }
}
