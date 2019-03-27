import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AppState } from 'src/app/shared/store/app.reducers';
import { AuthState } from '../store/auth.reducers';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss']
})
export class AuthLayoutComponent implements OnInit {
  error: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.error = this.store.select('auth').pipe(
      map((authState: AuthState) => authState.error)
    );
  }
}
