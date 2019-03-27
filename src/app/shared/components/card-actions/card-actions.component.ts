import { Component, OnInit, HostListener, ElementRef, QueryList, ViewChildren, Input, Output, EventEmitter } from '@angular/core';
import { CardAction } from './card-action.model';

@Component({
  selector: 'app-card-actions',
  templateUrl: './card-actions.component.html',
  styleUrls: ['./card-actions.component.scss']
})
export class CardActionsComponent implements OnInit {
  @Input()
  actions: CardAction[] = [];

  @Output('action')
  onAction = new EventEmitter<CardAction>();

  visible = false;

  @ViewChildren('button')
  private buttons: QueryList<ElementRef>;

  ngOnInit() {
  }

  onToggle () {
    this.visible = !this.visible;
  }

  onActionClick (action: CardAction) {
    this.visible = false;
    this.onAction.next(action);
  }

  @HostListener('document:mousedown', ['$event'])
  onOutsideClick (event: MouseEvent) {
    const path = event.composedPath();

    if (this.buttons.some(button => path.includes(button.nativeElement))) {
      return;
    }

    this.visible = false;
  }
}
