import {Directive, ElementRef, Input} from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() highlightColor = 'yellow';

  constructor(el: ElementRef) {
      el.nativeElement.style.backgroundColor = this.highlightColor;
  }

}
