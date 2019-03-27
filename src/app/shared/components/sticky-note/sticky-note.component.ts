import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sticky-note',
  templateUrl: './sticky-note.component.html',
  styleUrls: ['./sticky-note.component.scss']
})
export class StickyNoteComponent implements OnInit {
  @Input()
  formControlName: string;
  @Input()
  ngStyle: { [key: string]: string; };

  constructor() { }

  ngOnInit() {
  }

}
