import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadColumns } from 'src/app/state/columns/columns.actions';
import { ColumnsState } from 'src/app/state/columns/columns.reducer';

@Component({
  selector: 'app-board-page',
  templateUrl: './board-page.component.html',
  styleUrls: ['./board-page.component.scss']
})
export class BoardPageComponent implements OnInit {
  //columns: Observable<Column[]>;

  constructor(private readonly store: Store<ColumnsState>) {

  }

  ngOnInit(): void {
    this.store.dispatch(loadColumns());
  }

}
