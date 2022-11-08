import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BoardsComponent } from './components/boards/boards.component';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { BoardPageComponent } from './components/board-page/board-page.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { ColumnComponent } from './components/board-page/components/column/column.component';
import { NewColumnModalComponent } from './components/board-page/components/new-column-modal/new-column-modal.component';
import { NewTaskModalComponent } from './components/board-page/components/new-task-modal/new-task-modal.component';
import { UpdateTaskModalComponent } from './components/board-page/components/update-task-modal/update-task-modal.component';

@NgModule({
  declarations: [
    DashboardComponent,
    BoardsComponent,
    NewBoardComponent,
    BoardPageComponent,
    ColumnComponent,
    NewColumnModalComponent,
    NewTaskModalComponent,
    UpdateTaskModalComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    DragDropModule,
    SharedModule,
    MatDialogModule,
  ],
})
export class DashboardModule {}
