import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {
  @Input() items: any[];
  filteredItems;
  globalFilter = '';
  typeFilter = '';
  titleFilter = '';
  priorityFilter = '';
  estimatedFilter = '';
  sum = 0;
  orderType: any;
  sortAscending = true;
  selectedPage = 0;
  pagedItems;

  ngOnInit() {
    this.filteredItems = this.items;
    this.settingUpPagedItems();
  }

  filterItems(): void {
    this.filteredItems = this.items;
    if (this.typeFilter) {
      const value = this.typeFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => i._type.toLowerCase().indexOf(value) >= 0);
    }
    if (this.titleFilter) {
      const value = this.titleFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => i._title.toLowerCase().indexOf(value) >= 0);
    }
    if (this.priorityFilter) {
      const value = this.priorityFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => i._priority.indexOf(value) >= 0);
    }
    if (this.estimatedFilter) {
      const value = this.estimatedFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => i._estimated.toString().indexOf(value) >= 0);
    }
    if (this.globalFilter) {
      const value = this.globalFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => {
        if (i._type.toLowerCase().indexOf(value) >= 0 || i._title.toLowerCase().indexOf(value) >= 0 || i._priority.indexOf(value) >= 0 || i._estimated.toString().indexOf(value) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    }
    this.settingUpPagedItems();
  }

  sortItems(orderType: any): void {
    if (this.orderType === orderType) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true;
    }
    this.orderType = orderType;
    if (this.sortAscending) {
      this.filteredItems.sort((a, b) => a[orderType] > b[orderType] ? 1 : -1);
    } else {
      this.filteredItems.sort((a, b) => a[orderType] > b[orderType] ? -1 : 1);
    }
    this.settingUpPagedItems();
  }

  selectPage(selectedPage: number) {
    this.selectedPage = selectedPage;
    this.sum = 0;
    this.pagedItems[selectedPage].forEach(item => this.sum += item.estimated);
  }

  settingUpPagedItems() {
    this.pagedItems = [];
    for ( let i = 0; i < this.filteredItems.length / 10; i++ ) {
      const startindex = i * 10;
      this.pagedItems.push(this.filteredItems.slice(startindex, startindex + 10));
    }
    this.selectPage(0);
  }
}
