import { Directive, HostBinding, HostListener, ContentChild, ContentChildren, AfterContentInit, QueryList, Renderer2, OnInit, ElementRef } from '@angular/core';
import { DropdownToggleDirective } from './dropdown-toggle.directive';
import { DropdownMenuDirective } from './dropdown-menu.directive';
import { DropdownMenuItemDirective } from './dropdown-menu-item.directive';
import { DropdownInputDirective } from './dropdown-input.directive';
import { DropdownTextDirective } from './dropdown-text.directive';
import { ActivatedRoute } from '@angular/router';

@Directive({
  selector: '[appDropdown]'
})
export class DropdownDirective implements OnInit, AfterContentInit {
  @HostBinding('class.open')
  private isOpen = false;

  @ContentChild(DropdownToggleDirective)
  private toggler: DropdownToggleDirective;

  @ContentChild(DropdownMenuDirective)
  private menu: DropdownMenuDirective;

  @ContentChild(DropdownInputDirective)
  private input: DropdownInputDirective;

  @ContentChild(DropdownTextDirective)
  private text: DropdownTextDirective;

  @ContentChildren(DropdownMenuItemDirective, { descendants: true })
  menuItems: QueryList<DropdownMenuItemDirective>;

  constructor (
    private element: ElementRef,
    private renderer: Renderer2,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.renderer.addClass(this.element.nativeElement, 'dropdown');
  }

  ngAfterContentInit() {
    if (!this.toggle) {
      return;
    }

    this.toggler.onToggle.subscribe(() => {
      this.toggle();
    });

    this.menuItems.forEach(item => {
      item.onSelect.subscribe(data => {
        if (this.input && data !== undefined) {
          const event = new CustomEvent('input', {bubbles: true});

          this.renderer.setProperty(this.input.element.nativeElement, 'value', data.value ? data.value : '');
          this.renderer.setProperty(this.text.element.nativeElement, 'innerText', data.text);

          this.input.element.nativeElement.dispatchEvent(event);
        }

        this.menuItems.forEach(i => this.renderer.removeClass(i.element.nativeElement, 'active'));
        this.renderer.addClass(item.element.nativeElement, 'active');

        this.toggle(false);
      });
    });
  }

  @HostListener('document:mousedown', ['$event.target'])
  private onDocumentMousedown(target) {

    if (this.menuItems.length > 4) {
      this.renderer.setAttribute(this.menu.element.nativeElement, 'style', 'height: 250px');
      this.renderer.addClass(this.menu.element.nativeElement, 'scrollbar');
      this.renderer.addClass(this.menu.element.nativeElement, 'scrollbar-dark');
    }

    if (!this.isOpen) {
      return;
    }

    const inside =
      (<HTMLElement>this.toggler.element.nativeElement).contains(target) ||
      (<HTMLElement>this.menu.element.nativeElement).contains(target);

    if (!inside) {
      this.toggle(false);
    }

    // if (this.route.params['id']) {
    //   console.log(this.route.params['id']);
    //   const event = new CustomEvent('input', {bubbles: true});
    //   this.input.element.nativeElement.dispatchEvent(event);
    // }
  }

  toggle(value = !this.isOpen) {
    this.isOpen = value;

    if (this.menu) {
      this.menu.isOpen = value;
    }
  }
}
