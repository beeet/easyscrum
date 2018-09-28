import {Directive, ElementRef, HostListener} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  color = '';

  @HostListener('click', ['$event.target']) onClick(btn) {
    if (this.color === '') {
      this.highlight('yellow');
    } else {
      this.highlight('');
    }
  }

  constructor(private el: ElementRef) {

  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
    this.color = color;
  }

}
