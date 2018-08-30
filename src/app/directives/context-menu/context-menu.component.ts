import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-context-menu',
  templateUrl: './context-menu.component.html',
  styleUrls: ['./context-menu.component.scss']
})
export class ContextMenuComponent {
  @Input() x = 0;
  @Input() y = 0;
  @Input() actions;
  @Output() action = new EventEmitter();

  onAction(element) {
    this.action.emit(element);
  }

}
