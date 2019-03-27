import { Component, OnInit } from '@angular/core';
import { EmployeeListModel } from '../employee-models';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {
  employees: EmployeeListModel[] = [
    {
      id: '0',
      image: 'https://m.media-amazon.com/images/G/01/gcx/gf/age-group-woman-circle._CB278609004_.png',
      firstName: 'Ani',
      middleName: '',
      lastName: 'Karapetyan',
      level: 'Senior',
      email: 'anik@ogmainc.com',
      phone: '55 88 77 88'
    },
    {
      id: '1',
      image: 'https://m.media-amazon.com/images/G/01/gcx/gf/age-group-woman-circle._CB278609004_.png',
      firstName: 'Anna',
      middleName: '',
      lastName: 'Hovhannisyan',
      level: 'Junior',
      email: 'annh@ogmainc.com',
      phone: '93 74 55 42'
    },
    {
      id: '2',
      image: 'https://m.media-amazon.com/images/G/01/gcx/gf/age-group-woman-circle._CB278609004_.png',
      firstName: 'Arman',
      middleName: '',
      lastName: 'Vardanyan',
      level: 'Junior',
      email: 'armv@ogmainc.com',
      phone: '41 55 44 77'
    },
    {
      id: '3',
      image: 'https://m.media-amazon.com/images/G/01/gcx/gf/age-group-woman-circle._CB278609004_.png',
      firstName: 'Samvel',
      middleName: '',
      lastName: 'Bakumyan',
      level: 'Mid',
      email: 'samb@ogmainc.com',
      phone: '93 55 66 66'
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}
