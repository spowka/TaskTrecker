import { Component, OnInit, Input, Renderer2 } from '@angular/core';
import { LogModel } from 'src/app/logs/log-models';
import { LogService } from 'src/app/logs/log.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-exam-log-item',
  templateUrl: './exam-log-item.component.html',
  styleUrls: ['./exam-log-item.component.scss']
})
export class ExamLogItemComponent implements OnInit {
  // @ViewChild('btnDownloadQuestions') btnDownloadQuestions: ElementRef;
  @Input() log: LogModel;
  @Input() index: LogModel;
  difficulty: { value: string | number, text: string }[];
  paragraphs: { value: string | number, text: string }[];
  subjects: { value: string | number, text: string }[];
  levels: { value: string | number, text: string }[];


  constructor(
    private logService: LogService,
    private route: ActivatedRoute,
    private router: Router,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.difficulty = this.logService.difficulty;
    this.paragraphs = this.logService.paragraphs;
    this.subjects = this.logService.subjects;
    this.levels = this.logService.levels;
  }

  getBgPosition() {
    const difficultyId = +this.log.difficulty;
    let x: number;
    const  y = +this.log.difficulty < 5 ? 9 : -62;

    switch (true) {
      case difficultyId === 1 || difficultyId === 5:
        x = 0;
        break;
      case difficultyId === 2 || difficultyId === 6:
        x = -46;
        break;
      case difficultyId === 3 || difficultyId === 7:
        x = -92;
        break;
      case difficultyId === 4 || difficultyId === 8:
        x = -144;
        break;
    }

    return x + 'px ' +  y + 'px';
  }


  onPrev() {

  }

  onNext() {

  }
}
