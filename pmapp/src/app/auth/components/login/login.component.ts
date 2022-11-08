import { AuthService } from 'src/app/_services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, loginSuccess } from 'src/app/state/system/system.actions';
import { getSystemStatus, SystemState } from 'src/app/state/system/system.reducer';
import { getAuthError } from 'src/app/state';
import { UserData } from 'src/app/_services/user/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  errorCode$: Observable<string | null>;
  form: LoginForm = {
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>, private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.store.pipe(select(getSystemStatus));
    this.errorCode$ = this.store.pipe(select(getAuthError));
  }

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

  gotoDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}

interface LoginForm {
  login: string;
  password: string;
}
