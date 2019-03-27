import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/shared/store/app.reducers';
import * as AuthActions from 'src/app/auth/store/auth.actions';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  onSignOut() {
    this.store.dispatch(new AuthActions.TrySignoutAction());
  }
}
