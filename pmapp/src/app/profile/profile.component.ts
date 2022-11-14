import { SystemState } from './../state/system/system.reducer';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';
import { loadUserName } from '../state/system/system.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private readonly store: Store<SystemState>) {}
  ngOnInit(): void {
    this.store.dispatch(loadUserName());
  }
}
