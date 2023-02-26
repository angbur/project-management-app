import { AuthService } from '_services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, loginSuccess } from 'state/system/system.actions';
import { getSystemStatus, SystemState } from 'state/system/system.reducer';
import { getAuthError } from 'state';
import { UserData } from '_services/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: Observable<boolean> = this.store.pipe(select(getSystemStatus));
  errorCode$: Observable<string | null> = this.store.pipe(select(getAuthError));
  form: LoginForm = {
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    if (sessionStorage.getItem('token') && sessionStorage.getItem('userId')) {
      const token = sessionStorage.getItem('token');
      const id = sessionStorage.getItem('userId');
      const user: UserData = {
        token: token,
        id: id as string,
      };
      this.store.dispatch(loginSuccess({ user }));
    }
  }

  onSubmit(): void {
    this.store.dispatch(login({ data: this.form }));
  }
}

interface LoginForm {
  login: string;
  password: string;
}
