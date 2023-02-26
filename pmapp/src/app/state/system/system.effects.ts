import { selectUserId } from './../index';
import { Store } from '@ngrx/store';
import { User } from '_services/user/user.model';
import { UserService } from '_services/user/user.service';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, switchMap, tap, withLatestFrom } from 'rxjs/operators';

import { AuthService } from '_services/auth/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import * as SystemActions from './system.actions';
import { SystemState } from './system.reducer';

@Injectable({ providedIn: 'root' })
export class SystemEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.login),
      mergeMap((data: any) => {
        return this.AuthService.login({ login: data.data.login, password: data.data.password }).pipe(
          map((user: any) => {
            if (user.token) {
              this.AuthService.setToken(user.token, user.id);
            }
            return SystemActions.loginSuccess({ user });
          }),
          catchError(error => of(SystemActions.loginError({ error: error.error })))
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
          catchError(error => of(SystemActions.registerError({ error: error.error })))
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

  loadUserName = createEffect(() =>
    this.actions$.pipe(
      ofType(SystemActions.loadUserName),
      withLatestFrom(this.systemStore.select(selectUserId)),
      mergeMap(([action, userId]) => {
        return this.UserService.getUserById(userId as string).pipe(
          map((data: any) => SystemActions.userNameLoaded({ userName: data.name })),
          catchError(error => of(SystemActions.userNameLoadedError({ error: error.error })))
        );
      })
    )
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
    private UserService: UserService,
    private router: Router,
    private systemStore: Store<SystemState>,
    private toastr: ToastrService
  ) {}
}
