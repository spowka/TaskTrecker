import { Directive, ElementRef, Renderer2, AfterViewInit } from '@angular/core';

@Directive({
  selector: '[appAppErrorMessage]'
})
export class AppErrorMessageDirective implements AfterViewInit {

  constructor(private elem: ElementRef, private renderer: Renderer2) {
  }

  ngAfterViewInit() {
    if (this.elem.nativeElement.getAttribute('appVisible') === 'true') {
      this.renderer.setAttribute(this.elem.nativeElement, 'tabindex', '0');
    }
  }
}
