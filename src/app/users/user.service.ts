import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Subject } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

import { environment } from '../../environments/environment';

import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UsersService {
  static readonly url = 'users';

  private users: User[] = [];
  usersChanged = new Subject<User[]>();

  constructor (
    private httpClient: HttpClient
  ) {}

  get () {
    this.httpClient.get<User[]>(`${environment.serviceUrl}/${UsersService.url}`)
      .pipe(
        tap(
          data => console.log(data),
          response => console.log(response.error)
        ),
        catchError((response: HttpErrorResponse) => {
          return null;
        })
      )
      .subscribe((users: User[] | null) => {
        if (!users) {
          return;
        }

        this.setUsers(users);
      });
  }

  private triggerUsersChanged () {
    this.usersChanged.next(this.getUsers());
  }

  setUsers (users: User[]) {
    this.users = users;
    this.triggerUsersChanged();
  }

  getUsers () {
    return [...this.users];
  }
}
