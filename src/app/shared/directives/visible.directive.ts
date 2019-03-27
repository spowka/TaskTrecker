import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';

@Directive({
  selector: '[appVisible]'
})
export class VisibleDirective implements OnChanges {
  @Input('appVisible')
  visible: boolean;
  visibilityChanged = new Subject<boolean>();



  constructor(
    public element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnChanges(changes: SimpleChanges) {
    if ('visible' in changes) {
      this.updateVisible(changes.visible.currentValue);
    }
  }

  updateVisible(visible: boolean) {
    this.renderer.setStyle(this.element.nativeElement, 'visibility', visible ? 'visible' : 'hidden');
    this.visibilityChanged.next(visible);
  }
}
