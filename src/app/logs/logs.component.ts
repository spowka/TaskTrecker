import { ModalService } from '../students/modal.service';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss']
})
export class LogsComponent implements OnInit {

  constructor(public modalService: ModalService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
  }

  onNewLog() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
