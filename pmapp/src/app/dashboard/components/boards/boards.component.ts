import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { DeleteBoard, SelectBoard } from 'src/app/state/boards/boards.actions';
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
  boards: Board[] | null = null;
  selectedBoard: Board | undefined = undefined;

  constructor(private readonly store: Store<BoardsState>) {}

  deleteBoard(boardId: string | undefined): void {
    if (boardId !== undefined) {
      this.store.dispatch( new DeleteBoard(boardId));
    }
  };

  selectBoard(boardId: string | undefined): void {
      this.selectedBoard = this.boards?.find(b => b._id === boardId);
      this.store.dispatch( new SelectBoard(this.selectedBoard as Board));
  };
}
