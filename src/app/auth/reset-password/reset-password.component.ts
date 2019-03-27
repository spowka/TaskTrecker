import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { AppState } from '../../shared/store/app.reducers';
import * as AuthActions from '../store/auth.actions';

import CustomValidators from './../../shared/validators';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  form: FormGroup;
  code: string;
  resetting = false;
  reseted = false;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.code = params['code'];
    });

    this.form = new FormGroup({
      password: new FormControl(null, [Validators.required]),
      confirmPassword: new FormControl(null)
    }, [CustomValidators.equals('password', 'confirmPassword')]);
  }

  onSubmit() {
    if (this.form.invalid) {
      this.store.dispatch(new AuthActions.SetErrorAction({ message: this.getFirstError() }));
      return;
    }
    this.resetting = true;
    this.store.dispatch(new AuthActions.ClearErrorAction());

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(this.form.controls['password'].value);
        // reject(new Error("Some server side error!"));
      }, 2000);
    }).then((email: string) => {
      this.resetting = false;
      this.reseted = true;
    }).catch((error: Error) => {
      this.resetting = false;
      this.store.dispatch(new AuthActions.SetErrorAction({ message: error.message }));
    });
  }

  getFirstError() {
    if (this.form.getError('required', ['password'])) {
      return 'Password can not be blank.';
    }

    if (this.form.getError('equals')) {
      return 'Passwords do not match.';
    }

    return null;
  }

  ngOnDestroy() {
    this.store.dispatch(new AuthActions.ClearErrorAction());
  }
}
