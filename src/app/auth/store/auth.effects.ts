import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Effect, Actions, ofType } from '@ngrx/effects';

import { from, throwError } from 'rxjs';
import { map, switchMap, mergeMap, catchError } from 'rxjs/operators';

import { AppState } from 'src/app/shared/store/app.reducers';
import * as AuthActions from './auth.actions';
import { AuthService } from '../auth.service';
import { SigninModel } from '../models/signin.model';
import { AuthModel } from '../models/auth.model';

@Injectable()
export class AuthEffects {
  @Effect()
  authSignin = this.actions.pipe(
    ofType(AuthActions.TRY_SIGNIN),
    map((action: AuthActions.TrySigninAction) => action.payload),
    switchMap((payload: AuthActions.SigninPayload) => {
      this.store.dispatch(new AuthActions.SetSigningInAction({ signingIn: true }));
      this.store.dispatch(new AuthActions.ClearErrorAction());

      return this.authService.signin(payload).pipe(
        mergeMap((data: AuthModel) => {
          if (!data.auth) {
            return throwError(new Error(data.message));
          }

          this.router.navigate(['/']);

          return [
            { type: AuthActions.SET_SIGNING_IN, payload: { signingIn: false } },
            { type: AuthActions.SIGNIN },
            { type: AuthActions.SET_TOKEN, payload: { token: data.token } }
          ];
        }),
        catchError((err: Error) => {
          return [
            { type: AuthActions.SET_SIGNING_IN, payload: { signingIn: false } },
            { type: AuthActions.SET_ERROR, payload: { message: err.message } }
          ];
        })
      );
    })
  );

  @Effect()
  authSignout = this.actions.pipe(
    ofType(AuthActions.TRY_SIGNOUT),
    map(() => {
      this.router.navigate(['/', 'auth', 'signin']);

      return new AuthActions.SignoutAction();
    })
  );

  constructor (
    private store: Store<AppState>,
    private actions: Actions,
    private router: Router,
    private authService: AuthService
  ) { }
}
