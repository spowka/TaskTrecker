import { Component, OnInit, Input } from '@angular/core';
import { EmployeeListModel } from '../../employee-models';

@Component({
  selector: 'app-employee-item',
  templateUrl: './employee-item.component.html',
  styleUrls: ['./employee-item.component.scss']
})
export class EmployeeItemComponent implements OnInit {
  @Input() employee: EmployeeListModel;

  constructor() { }

  ngOnInit() {
  }

}
