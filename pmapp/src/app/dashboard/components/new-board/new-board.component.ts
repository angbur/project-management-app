import { addBoard } from 'state/boards/boards.actions';
import { selectUserId } from 'state/index';
import { SystemState } from 'state/system/system.reducer';
import { Observable } from 'rxjs';
import { BoardsState } from 'state/boards/boards.reducer';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Board, BoardData } from '_services/board/board.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-board',
  templateUrl: './new-board.component.html',
  styleUrls: ['./new-board.component.scss'],
})
export class NewBoardComponent {
  form: BoardData = {
    title: '',
    users: [],
  };
  owner$: Observable<string | null> = this.systemStore.select(selectUserId);

  constructor(
    private readonly store: Store<BoardsState>,
    private readonly systemStore: Store<SystemState>,
    private router: Router
  ) {}

  onSubmit(): void {
    const newBoard: Board = {
      title: this.form.title,
      owner: '',
      users: [],
    };
    this.owner$.subscribe(userId => {
      if (userId !== null) {
        newBoard.owner = userId;
      }
    });
    this.store.dispatch(addBoard({ board: newBoard }));
  }

  handleClick(): void {
    this.router.navigate(['/dashboard']);
  }
}
