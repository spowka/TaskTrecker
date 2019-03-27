import { Component, OnInit, Input } from '@angular/core';
import { UserListModel } from '../../models/user-list.model';
import { CardAction } from '../../../shared/components/card-actions/card-action.model';

@Component({
  selector: 'app-user-item',
  templateUrl: './user-item.component.html',
  styleUrls: ['./user-item.component.scss']
})
export class UserItemComponent implements OnInit {
  @Input()
  user: UserListModel;

  actions = [CardAction.View, CardAction.Delete];

  constructor() { }

  ngOnInit() {
  }
}
