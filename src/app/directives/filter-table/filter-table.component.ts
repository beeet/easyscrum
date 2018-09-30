import _ from 'lodash';
import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Issue} from '../../services/issue';
import {DragulaService} from 'ng2-dragula';
import {IssueService} from '../../services/issue.service';
import {AppComponent} from '../../app.component';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnChanges {
  @Input() items: any[];
  @Input() tableColumns: string[];
  @Input() customSort: boolean;
  @Input() isBacklog: boolean;
  @Output() eventEmitterClick = new EventEmitter();

  filter = [];
  filteredItems;
  globalFilter = '';
  orderType: any;
  sortAscending = false;
  smallScreen: boolean;
  innerWidth: any;

  filterTypes = [
    {value: '', name: 'all'},
    {value: 'S', name: 'story'},
    {value: 'B', name: 'bug'},
    {value: 'T', name: 'task'}];

  filterPriorities = [
    {value: '', name: 'all'},
    {value: '1', name: 'critical'},
    {value: '2', name: 'major'},
    {value: '3', name: 'medium'},
    {value: '4', name: 'minor'},
    {value: '5', name: 'trivial'}];

  constructor(private dragula: DragulaService, private issueService: IssueService) {

  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.filteredItems = this.items;
    this.tableColumns.forEach(col => this.filter.push({key: col, value: ''}));
    if (this.customSort) {
      this.sortItems(this.tableColumns[2]);
    } else {
      this.backLogSort();
    }
    this.evaluateScreenSize();
    this.dragula.drop.subscribe(value => {
      if (this.filteredItems.length === 0) {
        return;
      }
      // Die Backlog-Priorität beginnt bei 1, deswegen 1 abziehen
      const fromIndex = this.issueService.get(value[1].id).backlogPriority - 1;
      let toIndex;
      if (_.hasIn(value[1], 'previousSibling.id')) {
        toIndex = this.issueService.get(value[1].previousSibling.id).backlogPriority - 1;
      } else {
        toIndex = -1;
      }
      // Beim Abwärtsschieben wird das Element aus dem Array entfernt und der Index des Ziel ändert sich.
      const offset = (fromIndex > toIndex) ? 1 : 0;
      const movedIssue = this.filteredItems[fromIndex];
      if (movedIssue) {
        // Beim Drag'n'Drop wird diese Funktion mehrere Male aufgerufen, wir arbeiten aber nur mit dem Issue, wenn es gefunden wurde.
        this.filteredItems.splice(fromIndex, 1);
        this.filteredItems.splice(toIndex + offset, 0, movedIssue);
        this.reorderPriority();
      }
    });
  }

  ngOnChanges() {
    this.filterItems();
    this.sortItems(undefined);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.evaluateScreenSize();
  }

  private evaluateScreenSize() {
    this.smallScreen = this.innerWidth <= 767;
  }

  filterItems(): void {
    this.filteredItems = this.items;
    this.reorderPriority();
    for (const f of this.filter) {
      if (f.value) {
        const value = f.value.toLocaleLowerCase();
        this.filteredItems = this.filteredItems.filter(i => this.getValue(i, f.key).toString().toLocaleLowerCase().indexOf(value) >= 0);
      }
    }

    if (this.globalFilter) {
      const value = this.globalFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => {
        for (const f of this.filter) {
          if (this.getValue(i, f.key).toString().toLocaleLowerCase().indexOf(value) >= 0) {
            return true;
          }
        }
        return false;
      });
    }
  }

  sortItems(orderType: any): void {
    if (this.customSort) {
      if (this.orderType === orderType) {
        this.sortAscending = !this.sortAscending;
      } else {
        this.sortAscending = true;
      }
      this.orderType = orderType;
      if (orderType === 'type' || orderType === 'priority') {
        if (this.sortAscending) {
          this.filteredItems.sort((a, b) => a[orderType].id > b[orderType].id ? 1 : -1);
        } else {
          this.filteredItems.sort((a, b) => a[orderType].id > b[orderType].id ? -1 : 1);
        }
      } else {
        if (this.sortAscending) {
          this.filteredItems.sort((a, b) => a[orderType] > b[orderType] ? 1 : -1);
        } else {
          this.filteredItems.sort((a, b) => a[orderType] > b[orderType] ? -1 : 1);
        }
      }
    } else {
      this.backLogSort();
    }
  }

  private backLogSort() {
    this.filteredItems.sort((a, b) => a.backlogPriority > b.backlogPriority ? 1 : -1);
  }

  /*
   * Die Backlog-Priority ist nur im Backlog relevant, deswegen wird diese hier neu anhand der Position im Array berechnet.
   */
  private reorderPriority() {
    if (this.isBacklog) {
      this.filteredItems.reduce((prev, current) => {
        if (current) {
          current.backlogPriority = prev.backlogPriority + 1;
          this.issueService.put(current);
          return current;
        } else {
          return prev;
        }
      }, {backlogPriority: 0});
    }
  }

  getValue(item: Issue, key: string) {
    const keys = key.split('.');
    let value = item;
    for (const k of keys) {
      if (value[k] instanceof Object) {
        value = value[k].id;
      } else {
        value = value[k];
      }
    }
    return value;
  }

  onrightClick(event, item) {
    event.item = item;
    event.source = 'pb';
    this.eventEmitterClick.emit(event);
  }

  dndClass(): string {
    // Drag'n'Drop ist nur möglich, wenn
    // - das Product-Backlog angezeigt wird
    // - der individuelle (Custom) Sort ausgeschalten ist
    // - kein Filter aktiv ist
    if (this.isBacklog && !this.customSort && !this.filter.some(f => !!f.value)) {
      return AppComponent.DRAGABLE;
    }
  }
}
