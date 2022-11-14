import { selectUserLogin } from './../../../state/index';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { SystemState } from 'src/app/state/system/system.reducer';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-profile-card',
  templateUrl: './profile-card.component.html',
  styleUrls: ['./profile-card.component.scss']
})
export class ProfileCardComponent {
  login$: Observable<string | null>;

  constructor(private readonly store: Store<SystemState>) {
    this.login$ = this.store.pipe(select(selectUserLogin));
  }
}
