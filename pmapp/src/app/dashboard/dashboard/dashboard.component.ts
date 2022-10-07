import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBoards } from 'src/app/state';
import { LoadBoards, UpdateBoard } from 'src/app/state/boards/boards.actions';
import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { Board } from 'src/app/_services/board/board.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(private readonly store: Store<BoardsState>) {
    this.boards$ =  this.store.pipe(select(selectAllBoards));
  }

  ngOnInit(): void {
    this.getBoards();
  };

  getBoards() {
    this.store.dispatch(new LoadBoards());
  };

  updateBoard(board: Board) {
    this.store.dispatch(new UpdateBoard(board));
  };

}
