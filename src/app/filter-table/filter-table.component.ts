import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-filter-table',
  templateUrl: './filter-table.component.html',
  styleUrls: ['./filter-table.component.css']
})
export class FilterTableComponent implements OnInit {
  @Input() items: any[];
  @Input() tableColumns: string[];
  filter = [];
  filteredItems;
  globalFilter = '';
  sum = 0;
  orderType: any;
  sortAscending = true;
  selectedPage = 0;
  pagedItems;

  ngOnInit() {
    this.filteredItems = this.items;
    this.settingUpPagedItems();
    this.tableColumns.forEach(col => this.filter.push({key: col, value: ''}));
  }

  filterItems(): void {
    this.filteredItems = this.items;
    for ( const f of this.filter ) {
      if (f.value) {
        const value = f.value.toLocaleLowerCase();
        this.filteredItems = this.filteredItems.filter(i => i[f.key].toString().toLocaleLowerCase().indexOf(value) >= 0);
      }
    }

    if (this.globalFilter) {
      const value = this.globalFilter.toLocaleLowerCase();
      this.filteredItems = this.filteredItems.filter(i => {
        for ( const f of this.filter ) {
          if (i[f.key].toString().toLocaleLowerCase().indexOf(value) >= 0) {
            return true;
          }
        }
        return false;
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
    if (this.pagedItems[selectedPage]) {
      this.pagedItems[selectedPage].forEach(item => this.sum += item.estimated);
    }
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