import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from './../../shared/store/app.reducers';
import * as AuthActions from './../store/auth.actions';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  email: string = null;
  sent = false;
  sending = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.store.dispatch(new AuthActions.SetErrorAction({ message: this.getFirstError() }));
      return;
    }

    this.sending = true;
    this.store.dispatch(new AuthActions.ClearErrorAction());

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.form.controls['email'].value);
        // reject(new Error("Some server side error!"));
      }, 2000);
    }).then((email: string) => {
      this.sending = false;
      this.email = email;
      this.sent = true;
    }).catch((error: Error) => {
      this.sending = false;
      this.store.dispatch(new AuthActions.SetErrorAction({ message: error.message }));
    });
  }

  onResend() {
    this.sending = true;
    this.store.dispatch(new AuthActions.ClearErrorAction());

    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.email);
        // reject(new Error("Some server side error!"));
      }, 2000);
    }).then(() => {
      this.sending = false;
    }).catch((error: Error) => {
      this.sending = false;
      this.store.dispatch(new AuthActions.SetErrorAction({ message: error.message }));
    });
  }

  getFirstError() {
    if (this.form.getError('required', ['email'])) {
      return 'Email can not be blank.';
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
