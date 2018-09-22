import {Component, EventEmitter, HostListener, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Issue} from '../../services/issue';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.scss']
})
export class FilterTableComponent implements OnInit, OnChanges {
  @Input() items: any[];
  @Input() tableColumns: string[];
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

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.filteredItems = this.items;
    this.tableColumns.forEach(col => this.filter.push({key: col, value: ''}));
    this.sortItems(this.tableColumns[2]);
    this.evaluateScreenSize();
  }

  ngOnChanges() {
    this.filterItems();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
    this.evaluateScreenSize();
  }

  private evaluateScreenSize() {
    if (this.innerWidth <= 767) {
      this.smallScreen = true;
    } else {
      this.smallScreen = false;
    }
  }

  filterItems(): void {
    this.filteredItems = this.items;
    for ( const f of this.filter ) {
      if (f.value) {
        const value = f.value.toLocaleLowerCase();
        this.filteredItems = this.filteredItems.filter(i => this.getValue(i, f.key).toString().toLocaleLowerCase().indexOf(value) >= 0);
      }
    }

    if (this.globalFilter) {
      const value = this.globalFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => {
        for ( const f of this.filter ) {
          if (this.getValue(i, f.key).toString().toLocaleLowerCase().indexOf(value) >= 0) {
            return true;
          }
        }
        return false;
      });
    }
  }

  sortItems(orderType: any): void {
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

  }

  getValue(item: Issue, key: string) {
    const keys = key.split('.');
    let value = item;
    for ( const k of keys ) {
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
}
