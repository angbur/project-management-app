import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Login, LoginError, LoginSuccess, Register, RegisterError, RegisterSuccess, SystemActionTypes } from './system.actions';

import { AuthService } from 'src/app/_services/auth/auth.service'
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

@Injectable({providedIn: 'root'})
export class SystemEffects {

  login$ = createEffect(() => this.actions$.pipe(
    ofType<Login>(SystemActionTypes.Login),
    switchMap((action) => {
      return this.AuthService.login({login: action.payload.login, password: action.payload.password})
        .pipe(
          map((user: any) => {
            if (user.token){
              if (sessionStorage.getItem('token')) {
                sessionStorage.clear();
              }
              sessionStorage.setItem('token', user.token);
            };
            return (new LoginSuccess({token: user.token, _id: user.id}));
          }),
          catchError((error) => of(new LoginError(error.status))),
        )
    }
    )
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(SystemActionTypes.LoginSuccess),
        tap(() => this.gotoDashboard())
    ), { dispatch: false }
  );

  logout$ = createEffect(() =>this.actions$.pipe(
    ofType(SystemActionTypes.Logout),
    tap((user) => {
      sessionStorage.removeItem('token');
    })), { dispatch: false }
  );

  register$ = createEffect(() => this.actions$.pipe(
    ofType<Register>(SystemActionTypes.Register),
    switchMap((action) => {
      return this.AuthService.register({name: action.payload.name, login: action.payload.login, password: action.payload.password})
        .pipe(
          map(() => new RegisterSuccess()),
          catchError((error) => of(new RegisterError(error.status))),
        )
    })
  ));

  registerSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(SystemActionTypes.RegisterSuccess),
    tap(() => {
      this.goToLoginPage();
      this.toastr.success('Register success!')})
  ), { dispatch: false }
  );

  registerError$ = createEffect(() => this.actions$.pipe(
    ofType(SystemActionTypes.RegisterError),
    tap(() => {
      this.toastr.error('Failed!')})
  ), { dispatch: false }
  );

  loginError$ = createEffect(() => this.actions$.pipe(
    ofType(SystemActionTypes.LoginError),
    tap(() => {
      this.toastr.error('Failed!')})
  ), { dispatch: false }
  );

  gotoDashboard(): void {
    this.router.navigate(['/dashboard']);
  };

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  };

  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}

