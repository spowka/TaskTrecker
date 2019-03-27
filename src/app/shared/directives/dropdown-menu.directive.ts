import { Directive, HostBinding, ElementRef, Output, EventEmitter, Input, AfterContentInit, ContentChildren, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appDropdownMenu]'
})
export class DropdownMenuDirective implements OnInit {
  @HostBinding('class.show')
  isOpen = false;

  constructor(
    public element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'dropdown-menu');
  }
}
