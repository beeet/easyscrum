import { Component, OnInit } from '@angular/core';
import {IssueService} from '../services/issue.service';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.css']
})
export class ProductBacklogComponent implements OnInit {
  issueService: IssueService;

  constructor(issueService: IssueService) {
    this.issueService = issueService;
  }

  ngOnInit() {
  }

}
