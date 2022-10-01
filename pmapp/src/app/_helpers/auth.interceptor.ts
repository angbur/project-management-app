import { HTTP_INTERCEPTORS, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { select, Store } from '@ngrx/store';
import { getUserToken, SystemState, token } from '../state/system/system.reducer';

const TOKEN_HEADER = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  token: string | null;

  constructor(private readonly store: Store<SystemState>) {
    this.token = sessionStorage.getItem('token');
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;

    if (this.token != null) {
      authReq = req.clone({ headers: req.headers.set(TOKEN_HEADER, 'Bearer ' + this.token) });
    }
    return next.handle(authReq);
  }
};

export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];

