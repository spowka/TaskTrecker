import { Injectable } from '@angular/core';
import { LogModel } from './log-models';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: LogModel[] = [
    {
      title: 'Log',
      difficulty: '2',
      subject: '1',
      level: '3',
      paragraph: '2',
      descriptionText: 'Some text',
      interchange: [ { question: 'How are you?', answer: 'Fine!' } ],
      id: '0'
    },
    {
      title: 'Log',
      difficulty: '6',
      subject: '2',
      level: '2',
      paragraph: '1',
      descriptionText: 'Some text',
      interchange: [ { question: 'How are you?', answer: 'Fine!' } ],
      id: '1'
    },
    {
      title: 'Log',
      difficulty: '8',
      subject: '1',
      level: '1',
      paragraph: '4',
      descriptionText: 'Some text',
      interchange: [ { question: 'How are you?', answer: 'Fine!' } ],
      id: '2'
    }
  ];

  logsChanged = new BehaviorSubject<LogModel[]>(this.logs);

  difficulty = [
    { value: 0, text: '' },
    { value: 1, text: 'Apprentice' },
    { value: 2, text: 'Beginner' },
    { value: 3, text: 'Neophyte' },
    { value: 4, text: 'Newbie' },
    { value: 5, text: 'Novice' },
    { value: 6, text: 'Recruit' },
    { value: 7, text: 'Rookie' },
    { value: 8, text: 'Tyro' }
  ];

  paragraphs = [
    { value: 0, text: '' },
    { value: 1, text: 'Operators' },
    { value: 2, text: 'Boolean' },
    { value: 3, text: 'Class' },
    { value: 4, text: 'Attribute' }
  ];

  subjects = [
    { value: 0, text: '' },
    { value: 1, text: 'C#' },
    { value: 2, text: 'JavaScript' },
    { value: 3, text: 'TypeScript' },
    { value: 4, text: 'MongoDB' }
  ];

  levels = [
    { value: 0, text: '' },
    { value: 1, text: 'A' },
    { value: 2, text: 'B' },
    { value: 3, text: 'C' },
  ];

  constructor() { }

  getLog(index: number) {
    return this.logs[index];
  }

  getLogs() {
    return this.logs.slice();
  }

  addLog(log: LogModel) {
    this.logs.push(log);
    this.logsChanged.next(this.logs.slice());
  }

  updateLog(index: number, log: LogModel) {
    this.logs[index] = log;
    this.logsChanged.next(this.logs.slice());
  }

  removeLog(index: number) {
    this.logs.splice(index, 1);
    this.logsChanged.next(this.logs.slice());
  }
}
