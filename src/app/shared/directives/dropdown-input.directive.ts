import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownInput]'
})
export class DropdownInputDirective implements OnInit {
  constructor(
    public element: ElementRef,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'dropdown-input');
  }

  // // @HostListener('change', ['$event'])
  // @HostListener('change', ['$event'])
  // @HostListener('input', ['$event'])
  // onChange(event) {
  //   debugger;
  // }
}
