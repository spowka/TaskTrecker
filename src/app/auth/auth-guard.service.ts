import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { take, map } from 'rxjs/operators';

import { AppState } from '../shared/store/app.reducers';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(store => store.auth.authenticated).pipe(
      take(1),
      map(authenticated => {
        if (authenticated) {
          return true;
        }

        this.router.navigate(['/', 'auth', 'signin']);
        return false;
      })
    );
  }
}
