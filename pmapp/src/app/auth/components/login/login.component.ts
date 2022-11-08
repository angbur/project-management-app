import { AuthService } from 'src/app/_services/auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { login, setInitialToken } from 'src/app/state/system/system.actions';
import { getSystemError, getSystemStatus, SystemState } from 'src/app/state/system/system.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
  errorCode$: Observable<Error | null>;
  form: LoginForm = {
    login: '',
    password: '',
  };

  constructor(private readonly store: Store<SystemState>, private router: Router, private authService: AuthService) {
    this.isLoggedIn = this.store.pipe(select(getSystemStatus));
    this.errorCode$ = this.store.pipe(select(getSystemError));
  }

  ngOnInit(): void {
    this.authService.getToken().subscribe((token: string | null) => {
      this.store.dispatch(setInitialToken({ token: token as string }));
    });
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
