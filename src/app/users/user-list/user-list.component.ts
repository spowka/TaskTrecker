import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { UsersService } from '../user.service';
import { UserListModel } from '../models/user-list.model';
import { User } from '../models/user.model';
import { userCast } from '../models/user.cast';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users: UserListModel[];
  /* = [
    { id: '1', fullName: 'Tigran Grigoryan', email: 'tigrangr@ogmainc.com', isAdmin: true, isStudent: true, isEmployee: true },
    { id: '2', fullName: 'Anahit Hovhannisyan', email: 'anahith@ogmainc.com', isAdmin: false, isStudent: false, isEmployee: true },
    { id: '3', fullName: 'Hovhannes Kazhoyan', email: 'hovhanneskh@ogmainc.com', isAdmin: false, isStudent: false, isEmployee: true },
    { id: '4', fullName: 'Manuk Martirosyan', email: 'manukm@ogmainc.com', isAdmin: false, isStudent: true, isEmployee: true },
    { id: '5', fullName: 'John Smith', email: 'johns@ogmainc.com', isAdmin: false, isStudent: true, isEmployee: false },
    { id: '6', fullName: 'Tatul Mkrtchyan', email: 'tatulm@ogmainc.com', isAdmin: false, isStudent: false, isEmployee: false },
    { id: '7', fullName: 'Kate Black', email: 'kateb@ogmainc.com', isAdmin: true, isStudent: false, isEmployee: false }
  ]; */
  usersSubscription: Subscription;

  constructor(
    private usersService: UsersService
  ) { }

  ngOnInit() {
    this.usersSubscription = this.usersService.usersChanged.subscribe(users => this.setUsers(users));

    this.usersService.get();
  }

  setUsers (users: User[]) {
    this.users = users.map(user => userCast.userToUserListModel(user));
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
