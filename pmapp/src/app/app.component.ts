import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loginSuccess } from './state/system/system.actions';
import { SystemState } from './state/system/system.reducer';
import { UserData } from './_services/user/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private readonly systemStore: Store<SystemState>) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('userId')) {
      const token = sessionStorage.getItem('token');
      const id = sessionStorage.getItem('userId');
      const user: UserData = {
        token: token,
        id: id as string,
      };
      this.systemStore.dispatch(loginSuccess({ user }));
    }
  }
  title = 'pmapp';
}
