import { Component, OnInit, Input, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { LogModel } from '../../log-models';
import { ActivatedRoute, Router } from '@angular/router';
import { LogService } from '../../log.service';

@Component({
  selector: 'app-log-item',
  templateUrl: './log-item.component.html',
  styleUrls: ['./log-item.component.scss']
})
export class LogItemComponent implements OnInit {
  @ViewChild('btnDownloadInterchange') btnDownloadInterchange: ElementRef;
  @ViewChild('btnDownloadQuestions') btnDownloadQuestions: ElementRef;
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

  onEdit(log: LogModel) {
    const id = this.logService.getLogs().indexOf(log);
    this.router.navigate([id, 'edit'], { relativeTo: this.route });
  }

  onRemove(id: number) {
    this.logService.removeLog(id);
  }

  onDownloadInterchange(log: LogModel) {
    let text = '';
    log.interchange.forEach(item => {
      text += item.question + ' //ANSWER: ' + item.answer;
    });
    const file = new Blob([text], {type: 'text/plain'});
    this.renderer.setAttribute(this.btnDownloadInterchange.nativeElement, 'href', URL.createObjectURL(file));
    this.renderer.setAttribute(this.btnDownloadInterchange.nativeElement, 'download', `${log.title}.txt`);
  }

  onDownloadQuestions(log: LogModel) {
    let text = '';
    log.interchange.forEach(item => {
      text += item.question + '\n';
    });
    const file = new Blob([text], {type: 'text/plain'});
    this.btnDownloadQuestions.nativeElement.href = URL.createObjectURL(file);
    this.btnDownloadQuestions.nativeElement.download = log.title + '.txt';
  }
}
