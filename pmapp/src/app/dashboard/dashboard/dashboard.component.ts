import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectActualBoardsStatus, selectAllBoards } from 'src/app/state';
import { loadBoards, updateBoard } from 'src/app/state/boards/boards.actions';
import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { Board } from 'src/app/_services/board/board.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[] | null>;
  statusBoards$: Observable<string>;

  constructor(private readonly store: Store<BoardsState>) {
    this.boards$ = this.store.pipe(select(selectAllBoards));
    this.statusBoards$ = this.store.pipe(select(selectActualBoardsStatus));
  }

  ngOnInit(): void {
    this.getBoards();
  }

  getBoards() {
    this.store.dispatch(loadBoards());
  }

  updateBoard(board: Board) {
    this.store.dispatch(updateBoard({ board: board }));
  }
}
