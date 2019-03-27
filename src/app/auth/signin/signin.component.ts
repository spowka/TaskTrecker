import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import * as AuthActions from '../store/auth.actions';

import { AppState } from '../../shared/store/app.reducers';
import { AuthState } from '../store/auth.reducers';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit, OnDestroy {
  form: FormGroup;
  signingIn: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      remember: new FormControl(true)
    });

    this.signingIn = this.store.select('auth').pipe(
      map((authState: AuthState) => authState.signingIn)
    );

    this.store.dispatch(new AuthActions.SigninAction({ email: 'a', password: 'a', remember: true }));
    this.store.dispatch(new AuthActions.SetTokenAction({ token: 'a' }));
    this.router.navigate(['/students']);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.store.dispatch(new AuthActions.SetErrorAction({ message: this.getFirstError() }));
      return;
    }

    this.store.dispatch(new AuthActions.TrySigninAction(this.form.value));
  }

  getFirstError() {
    if (this.form.getError('required', ['email'])) {
      return 'Email can not be blank.';
    }

    if (this.form.getError('required', ['password'])) {
      return 'Password can not be blank.';
    }

    if (this.form.getError('email', ['email'])) {
      return 'Email format is invalid.';
    }

    return null;
  }

  ngOnDestroy() {
    this.store.dispatch(new AuthActions.ClearErrorAction());
  }
}
