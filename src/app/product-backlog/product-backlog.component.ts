import {Component, OnInit} from '@angular/core';
import {IssueService} from '../services/issue.service';
import {forEach} from '@angular/router/src/utils/collection';
import {IssueState} from '../services/issueState';

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
  selectedPage = 0;
  pagedIssues;

  constructor(issueService: IssueService) {
    this.issueService = issueService;
    this.issues = this.issueService.getAll();
    this.issues = this.issues.filter(i => !i.sprintId);
    this.filteredIssues = this.issues;
    this.settingUpPagedIssues();
    this.selectPage(0);
  }

  ngOnInit() {
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
        if (i._type.toLowerCase().indexOf(value) >= 0 || i._title.toLowerCase().indexOf(value) >= 0 || i._priority.indexOf(value) >= 0 || i._estimated.toString().indexOf(value) >= 0) {
          return true;
        } else {
          return false;
        }
      });
    }
    this.settingUpPagedIssues();
    this.selectPage(0);
  }

  sortIssues(orderType: any): void {
    if (this.orderType === orderType) {
      this.sortAscending = !this.sortAscending;
    } else {
      this.sortAscending = true;
    }
    this.orderType = orderType;
    if (this.sortAscending) {
      this.filteredIssues.sort((a, b) => a[orderType] > b[orderType] ? 1 : -1);
    } else {
      this.filteredIssues.sort((a, b) => a[orderType] > b[orderType] ? -1 : 1);
    }
    this.settingUpPagedIssues();
    this.selectPage(0);
  }

  selectPage(selectedPage: number) {
    this.selectedPage = selectedPage;
    this.sum = 0;
    this.filteredIssues.forEach(issue => this.sum += issue.estimated);
  }

  private settingUpPagedIssues() {
    this.pagedIssues = [];
    for ( let i = 0; i < this.filteredIssues.length / 10; i++ ) {
      const startindex = i * 10;
      this.pagedIssues.push(this.filteredIssues.slice(startindex, startindex + 10));
    }
  }
}
