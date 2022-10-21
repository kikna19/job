import {Directive, ElementRef, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  selector: '[appClickOut]'
})
export class ClickOutDirective {
  @Output() toggle: EventEmitter<any> = new EventEmitter();
  @Output() close: EventEmitter<any> = new EventEmitter();

  constructor(
    private el: ElementRef
  ) {
  }

  @HostListener('document:click', ['$event.target']) closeEl(target: any) {
    const clickInside = this.el.nativeElement.parentElement.childNodes[0].contains(target);
    const clickOut = this.el.nativeElement.parentElement.childNodes[1].contains(target);

    if (clickInside)
      this.toggle.emit();

    if (!clickInside && !clickOut)
      this.close.emit();
  }

}
