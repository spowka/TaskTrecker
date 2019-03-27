import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDropdownText]'
})
export class DropdownTextDirective implements OnInit {
  constructor(
    public element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'dropdown-text');
  }
}
