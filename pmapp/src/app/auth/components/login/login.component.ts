import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login } from 'src/app/state/system/system.actions';
import { getSystemError, getSystemStatus, SystemState } from 'src/app/state/system/system.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  isLoggedIn: Observable<boolean>;
  errorCode$: Observable<Error | null>;
  form: LoginForm = {
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>, private router: Router) {
    this.isLoggedIn = this.store.pipe(select(getSystemStatus));
    this.errorCode$ = this.store.pipe(select(getSystemError));
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
