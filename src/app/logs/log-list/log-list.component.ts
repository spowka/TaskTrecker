import { Component, OnInit } from '@angular/core';

import { LogModel } from '../log-models';
import { LogService } from '../log.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-log-list',
  templateUrl: './log-list.component.html',
  styleUrls: ['./log-list.component.scss']
})
export class LogListComponent implements OnInit {
  logs: LogModel[];
  subscription: Subscription;

  constructor(private logService: LogService) { }

  ngOnInit() {
    this.logs = this.logService.getLogs();
    this.subscription = this.logService.logsChanged
      .subscribe((logs: LogModel[]) => {
        this.logs = logs;
      });
  }
}
