import { Component, Input, OnInit, Pipe } from '@angular/core';
import { Board } from 'src/app/_services/board/board.model';

@Component({
  selector: 'app-boards',
  templateUrl: './boards.component.html',
  styleUrls: ['./boards.component.scss']
})
export class BoardsComponent implements OnInit {
  @Input() boards: Board[] | null = null;

  constructor() {}

  ngOnInit(): void {
  }

}
