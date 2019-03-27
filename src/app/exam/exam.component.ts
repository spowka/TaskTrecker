import { Component, OnInit } from '@angular/core';
import { LogService } from '../logs/log.service';

@Component({
  selector: 'app-exam',
  templateUrl: './exam.component.html',
  styleUrls: ['./exam.component.scss']
})
export class ExamComponent implements OnInit {

  constructor(private logService: LogService) { }

  ngOnInit() {
  }

}
