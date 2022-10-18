import { Router } from '@angular/router';
import { BoardsState } from 'src/app/state/boards/boards.reducer';
import { Component, Input } from '@angular/core';
import { Board } from 'src/app/_services/board/board.model';
import { Store } from '@ngrx/store';
import { deleteBoard, selectedBoard } from 'src/app/state/boards/boards.actions';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent {
  @Input()
  boards: Board[] | null = null;
  selectedBoard: Board | undefined = undefined;

  constructor(private readonly store: Store<BoardsState>,
    private router: Router) {}

  deleteBoard(boardId: string | undefined): void {
    if (boardId !== undefined) {
      this.store.dispatch(deleteBoard({boardId: boardId}));
    }
  };

  selectBoard(boardId: string | undefined): void {
      this.selectedBoard = this.boards?.find(b => b._id === boardId);
      //this.store.dispatch(selectedBoard({board: this.boards[boardId]}));
      this.goToProjectPage(boardId as string);
  };


  goToProjectPage(id: string): void {
    this.router.navigate(["dashboard/board", id]);
  };
}
