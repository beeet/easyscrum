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
  @Input() contextmenuActions;
  @Output() action = new EventEmitter();
  filter = [];
  filteredItems;
  globalFilter = '';
  orderType: any;
  sortAscending = false;
  innerWidth: any;
  contextmenu = {visible: false, posX: 0, posY: 0};
  selectedItem;
  filterTypes = [
    {value: '', name: 'all types'},
    {value: 'S', name: 'story'},
    {value: 'B', name: 'bug'},
    {value: 'T', name: 'task'}];

  filterPriorities = [
    {value: '', name: 'all priorities'},
    {value: '1', name: 'blocker'},
    {value: '2', name: 'high'},
    {value: '3', name: 'medium'},
    {value: '4', name: 'low'}];

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.filteredItems = this.items;
    this.tableColumns.forEach(col => this.filter.push({key: col, value: ''}));
    this.sortItems(this.tableColumns[2]);
  }

  ngOnChanges() {
    this.filterItems();
    this.disableContextMenu();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
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

  onrightClick(event, item) {
    this.selectedItem = item;
    this.contextmenu.posX = event.clientX + 10;
    this.contextmenu.posY = event.clientY + 20;
    this.contextmenu.visible = true;
  }

  disableContextMenu() {
    this.contextmenu.visible = false;
  }

  onAction(e) {
    this.disableContextMenu();
    this.action.emit({action: e.action, item: this.selectedItem});
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
}
