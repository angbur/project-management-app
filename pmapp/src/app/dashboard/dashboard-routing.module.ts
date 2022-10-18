import { BoardPageComponent } from './components/board-page/board-page.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewBoardComponent } from './components/new-board/new-board.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path:'', component: DashboardComponent },
  { path:'new-board', component: NewBoardComponent },
  { path: 'board/:id', component: BoardPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
