import {Directive, ElementRef, HostListener, Input, OnChanges, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnChanges {
    el: ElementRef;

  @Input('doHighlight') doHighlight: boolean;

  @HostListener('mouseenter') onMouseEnter() {
      this.doHighlight = false;
  }

  constructor(el: ElementRef) {
      this.el = el;
      this.el.nativeElement.style.backgroundColor = '';
  }

    ngOnChanges(changes: SimpleChanges): void {
        if (this.doHighlight) {
            this.el.nativeElement.style.backgroundColor = 'yellow';
        } else {
            this.el.nativeElement.style.backgroundColor = '';
        }
        this.doHighlight = !this.doHighlight;
    }

}
