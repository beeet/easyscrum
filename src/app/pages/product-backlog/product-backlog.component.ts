import {Component, OnInit} from '@angular/core';
import {IssueService} from '../../services/issue.service';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css']
})
export class ProductBacklogComponent {
  issueService: IssueService;
  issues;
  tableColumns = ['type', 'title', 'priority', 'estimated'];

  constructor(issueService: IssueService) {
    this.issueService = issueService;
    this.issues = this.issueService.getAll().filter(i => !i.sprintId);
  }
}
