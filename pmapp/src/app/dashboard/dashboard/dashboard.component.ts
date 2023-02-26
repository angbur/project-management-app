import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectActualBoardsStatus, selectAllBoards } from 'state';
import { loadBoards, updateBoard } from 'state/boards/boards.actions';
import { BoardsState } from 'state/boards/boards.reducer';
import { login, loginSuccess } from 'state/system/system.actions';
import { SystemState } from 'state/system/system.reducer';
import { Board } from '_services/board/board.model';
import { UserData } from '_services/user/user.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[] | null>;
  statusBoards$: Observable<string>;

  constructor(private readonly store: Store<BoardsState>, private readonly systemStore: Store<SystemState>) {
    this.boards$ = this.store.pipe(select(selectAllBoards));
    this.statusBoards$ = this.store.pipe(select(selectActualBoardsStatus));
  }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.store.dispatch(loadBoards());
  }
}
