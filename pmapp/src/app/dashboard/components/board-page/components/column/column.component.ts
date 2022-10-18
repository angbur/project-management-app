import { getActualColumnsList } from './../../../../../state/index';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { Column } from 'src/app/_services/columns/column.model';
import { ColumnsState } from 'src/app/state/columns/columns.reducer';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss']
})
export class ColumnComponent implements OnInit {
  @Input()
  columns: Column[] | null = null;
  constructor() {}

  ngOnInit(): void {
  }

}
