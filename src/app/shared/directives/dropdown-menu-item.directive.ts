import { Directive, ElementRef, Renderer2, OnInit, EventEmitter, Output, Input, HostListener } from '@angular/core';

@Directive({
  selector: '[appDropdownMenuItem]'
})
export class DropdownMenuItemDirective implements OnInit {
  @Input()
  data: { value: number | string, text: string };

  @Input()
  text: string;

  @Output('select')
  onSelect = new EventEmitter<any>();



  constructor(
    public element: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'dropdown-item');
  }

  @HostListener('click', ['$event'])
  private onClick(event: MouseEvent) {
    event.stopPropagation();
    this.onSelect.next(this.data);
  }
}
