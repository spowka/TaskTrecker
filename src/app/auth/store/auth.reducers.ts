import * as AuthActions from './auth.actions';

export interface AuthState {
  signingIn: boolean;
  authenticated: boolean;
  token: string;
  error: string;
}

const initialState: AuthState = {
  signingIn: false,
  authenticated: false,
  token: null,
  error: null
};

export function authReducer(state = initialState, action: AuthActions.AuthAction) {
  switch (action.type) {
    case AuthActions.SET_SIGNING_IN:
      return {
        ...state,
        signingIn: action.payload.signingIn
      };
    case AuthActions.SIGNIN:
      return {
        ...state,
        authenticated: true
      };
    case AuthActions.SIGNOUT:
      return {
        ...state,
        token: null,
        authenticated: false
      };
    case AuthActions.SET_TOKEN:
      return {
        ...state,
        token: action.payload.token
      };
    case AuthActions.SET_ERROR:
      return {
        ...state,
        error: action.payload.message
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
}
