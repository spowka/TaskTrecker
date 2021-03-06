import { ActionReducerMap } from '@ngrx/store';

import { AuthState, authReducer } from '../../auth/store/auth.reducers';

export interface AppState {
  auth: AuthState;
}

export const appReducers: ActionReducerMap<AppState> = {
  auth: authReducer
};
