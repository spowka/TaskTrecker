import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { take, switchMap } from 'rxjs/operators';

import { AppState } from '../shared/store/app.reducers';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor (
    private store: Store<AppState>
  ) {}

  intercept (request: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {
    return this.store.select(state => state.auth.token)
      .pipe(
        take(1),
        switchMap(token => {
          if (token) {
            const requestClone = request.clone({
              headers: request.headers.set('x-access-token', token)
            });

            return next.handle(requestClone);
          }

          return next.handle(request);
        })
      );
  }
}
