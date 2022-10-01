import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, switchMap, tap } from 'rxjs/operators';
import { Login, LoginSuccess, SystemActionTypes } from './system.actions';

import { AuthService } from 'src/app/_services/auth/auth.service'
import { Router } from '@angular/router';

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
            return new LoginSuccess({token: user.token, _id: user._id});
          })
        )
    })
  ));

  loginSuccess$ = createEffect(() => this.actions$.pipe(
        ofType(SystemActionTypes.LoginSuccess),
        tap(() => this.gotoDashboard())
    ), { dispatch: false }
);

  gotoDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  constructor(
    private actions$: Actions,
    private AuthService: AuthService,
    private router: Router
  ) {}
}
