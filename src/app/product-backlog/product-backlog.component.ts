import {Component, OnInit} from '@angular/core';
import {IssueService} from '../services/issue.service';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {
  issueService: IssueService;
  issues;
  filteredIssues;
  globalFilter = '';
  typeFilter = '';
  titleFilter = '';
  priorityFilter = '';
  estimatedFilter = '';
  sum = 0;
  orderType: any;
  sortAscending = true;

  constructor(issueService: IssueService) {
    this.issueService = issueService;
    this.issues = this.issueService.getAll();
    this.filteredIssues = this.issues;
  }

  ngOnInit() {
    this.sum = 0;
  }

  filterIssues(): void {
    this.filteredIssues = this.issues;
    if (this.typeFilter) {
      const value = this.typeFilter.toLocaleLowerCase();
      this.filteredIssues = this.filteredIssues.filter(i => i._type.toLowerCase().indexOf(value) >= 0);
    }
    if (this.titleFilter) {
      const value = this.titleFilter.toLocaleLowerCase();
      this.filteredIssues = this.filteredIssues.filter(i => i._title.toLowerCase().indexOf(value) >= 0);
    }
    if (this.priorityFilter) {
      const value = this.priorityFilter.toLocaleLowerCase();
      this.filteredIssues = this.filteredIssues.filter(i => i._priority.indexOf(value) >= 0);
    }
    if (this.estimatedFilter) {
      const value = this.estimatedFilter.toLocaleLowerCase();
      this.filteredIssues = this.filteredIssues.filter(i => i._estimated.toString().indexOf(value) >= 0);
    }
    if (this.globalFilter) {
      const value = this.globalFilter.toLocaleLowerCase();
      this.filteredIssues = this.filteredIssues.filter(i => {
        console.log(value);
        if (i._type.toLowerCase().indexOf(value) >= 0 || i._title.toLowerCase().indexOf(value) >= 0 || i._priority.indexOf(value) >= 0 || i._estimated.toString().indexOf(value) >= 0) {
          return true;
        } else {
          return false;
        }

      });
    }
  }

  sortIssues(orderType: any): void {
    if (this.orderType === orderType) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true;
    }
    this.orderType = orderType;
    if (this.sortAscending) {
      return this.filteredIssues.sort((a, b) => a[orderType] > b[orderType] ? 1 : -1);
    } else {
      return this.filteredIssues.sort((a, b) => a[orderType] > b[orderType] ? -1 : 1);
    }
  }
}
