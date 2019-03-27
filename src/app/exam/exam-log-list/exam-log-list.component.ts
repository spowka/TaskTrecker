import { Component, OnInit } from '@angular/core';
import { LogModel } from 'src/app/logs/log-models';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/logs/log.service';

@Component({
  selector: 'app-exam-log-list',
  templateUrl: './exam-log-list.component.html',
  styleUrls: ['./exam-log-list.component.scss']
})
export class ExamLogListComponent implements OnInit {

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
