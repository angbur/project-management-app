import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { BoardsEffects } from './boards/boards.effects';
import { reducers } from '.';
import { SystemEffects } from './system/system.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([
      BoardsEffects,
      SystemEffects
    ]),
  ]
})
export class StateModule { }
