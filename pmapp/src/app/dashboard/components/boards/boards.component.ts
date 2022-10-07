import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { DeleteBoard } from 'src/app/state/boards/boards.actions';
import { Component, Input } from '@angular/core';
import { Board } from 'src/app/_services/board/board.model';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent {
  @Input()
  boards$: Board[] | null = null;
  @Input()
  deleteMethod!: Function;

  constructor(private readonly store: Store<BoardsState>) {}

  deleteBoard(boardId: string | undefined): void {
    if (boardId !== undefined) {
      this.store.dispatch( new DeleteBoard(boardId));
    }
  };

}
