import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap } from 'rxjs/operators';

import { AuthService } from 'src/app/_services/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as SystemActions from './system.actions';

@Injectable({ providedIn: 'root' })
export class SystemEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.login),
      mergeMap((data: any) => {
        return this.AuthService.login({ login: data.data.login, password: data.data.password }).pipe(
          map((user: any) => {
            if (user.token) {
              this.AuthService.setToken(user.token);
            }
            return SystemActions.loginSuccess({ user });
          }),
          catchError(error => of(SystemActions.loginError({ error })))
        );
      })
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SystemActions.loginSuccess),
        tap(() => this.gotoDashboard())
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SystemActions.logout),
        tap(() => {
          this.AuthService.logout();
          this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.register),
      mergeMap((data: any) => {
        return this.AuthService.register(data.data).pipe(
          map(() => SystemActions.registerSuccess()),
          catchError(error => of(SystemActions.registerError({ error })))
        );
      })
    )
  );

  registerSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SystemActions.registerSuccess),
        tap(() => {
          this.goToLoginPage();
          this.toastr.success('Register success!');
        })
      ),
    { dispatch: false }
  );

  registerError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SystemActions.registerError),
        tap(() => {
          this.toastr.error('Failed!');
        })
      ),
    { dispatch: false }
  );

  loginError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(SystemActions.loginError),
        tap(() => {
          this.toastr.error('Failed!');
        })
      ),
    { dispatch: false }
  );

  gotoDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToLoginPage(): void {
    this.router.navigate(['/login']);
  }

  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {}
}
