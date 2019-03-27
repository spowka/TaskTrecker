import { Action } from '@ngrx/store';
import { SigninModel } from '../models/signin.model';

export const TRY_SIGNIN = 'TRY_SIGNIN';
export const SET_SIGNING_IN = 'SET_SIGNING_IN';
export const SIGNIN = 'SIGNIN';
export const TRY_SIGNOUT = 'TRY_SIGNOUT';
export const SIGNOUT = 'SIGNOUT';
export const SET_TOKEN = 'SET_TOKEN';
export const SET_ERROR = 'SET_ERROR';
export const CLEAR_ERROR = 'CLEAR_ERROR';

export interface SetSigningInPayload {
  signingIn: boolean;
}

export interface SigninPayload extends SigninModel { }

export interface SetErrorPayload {
  message: string;
}

export interface SetTokenPayload {
  token: string;
}

export class TrySigninAction implements Action {
  readonly type = TRY_SIGNIN;

  constructor(
    public payload: SigninPayload
  ) {}
}

export class SigninAction implements Action {
  readonly type = SIGNIN;

  constructor(
    public payload: SigninPayload
  ) {}
}

export class TrySignoutAction implements Action {
  readonly type = TRY_SIGNOUT;
}

export class SignoutAction implements Action {
  readonly type = SIGNOUT;
}

export class SetSigningInAction implements Action {
  readonly type = SET_SIGNING_IN;

  constructor(
    public payload: SetSigningInPayload
  ) {}
}

export class SetErrorAction implements Action {
  readonly type = SET_ERROR;

  constructor(
    public payload: SetErrorPayload
  ) {}
}

export class ClearErrorAction implements Action {
  readonly type = CLEAR_ERROR;
}

export class SetTokenAction implements Action {
  readonly type = SET_TOKEN;

  constructor(public payload: SetTokenPayload) { }
}

export type AuthAction =
  SetSigningInAction |
  TrySigninAction | SigninAction |
  TrySignoutAction |SignoutAction |
  SetErrorAction | ClearErrorAction |
  SetTokenAction;
