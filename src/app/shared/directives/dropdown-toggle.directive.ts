import { Directive, HostListener, Output, EventEmitter, ElementRef, Renderer2, OnInit, ContentChild } from '@angular/core';

@Directive({
  selector: '[appDropdownToggle]'
})
export class DropdownToggleDirective implements OnInit {
  @Output('toggle')
  onToggle = new EventEmitter();

  constructor(
    public element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'dropdown-toggle');
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    event.stopPropagation();
    this.onToggle.next();
  }
}
