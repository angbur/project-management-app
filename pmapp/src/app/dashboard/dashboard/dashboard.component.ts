import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectAllBoards } from 'src/app/state';
import { AddBoard, DeleteBoard, LoadBoards, UpdateBoard } from 'src/app/state/boards/boards.actions';
import { Board } from 'src/app/_services/board/board.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  boards$: Observable<Board[]>;

  constructor(private readonly store: Store<{}>) {
    this.boards$ = store.pipe(select(selectAllBoards));
  }

  ngOnInit(): void {
    this.getBoards();
  }
  getBoards() {
    this.store.dispatch(new LoadBoards());
  }

  saveBoard(board: Board) {
    if (board._id.length === 0) {
      this.createBoard(board);
    } else {
      this.updateBoard(board);
    };
  };

  createBoard(board: Board) {
    this.store.dispatch(new AddBoard(board));
  };

  updateBoard(board: Board) {
    this.store.dispatch(new UpdateBoard(board));
  };

  deleteBoard(board: Board) {
    this.store.dispatch(new DeleteBoard(board));
  };

}
