import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {
  public items = [
    { title: 'Dashboard', route: ['/', 'dashboard'] },
    { title: 'Students', route: ['/', 'students'] },
    { title: 'Employees', route: ['/', 'employees'] },
    { title: 'Users', route: ['/', 'users'] },
    { title: 'Logs', route: ['/', 'logs'] },
    { title: 'Exam', route: ['/', 'exam'] }
  ];

  constructor() { }

  ngOnInit() { }
}
