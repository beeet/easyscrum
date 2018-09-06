import {Component, ContentChild, OnInit, ViewChild} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent {
  issueService: IssueService;
  issues;
  tableColumns = ['type', 'title', 'priority', 'estimated'];
  contextmenuActions = [
    {action: 'edit', icon: 'edit'},
    {action: 'change', icon: 'rotate_left'},
    {action: 'delete', icon: 'close'}
  ];

  constructor(issueService: IssueService, private router: Router) {
    this.issueService = issueService;
    this.issues = this.issueService.getAllWithoutSprintAssignment();
  }

  editItem(issue) {
    this.router.navigate(['/issue-board/' + issue.id]);
    console.log('edit Item: ' + issue.title);
  }

  deleteItem(issue) {
    this.issueService.delete(issue.id);
    this.issues = this.issueService.getAllWithoutSprintAssignment();
  }

  changeItemSprint(issue) {
    console.log('change Item: ' + issue.title);
  }

  onAction(e) {
    console.log(e);
    if (e.action === 'edit') {
      this.editItem(e.item);
    } else if (e.action === 'change') {
      this.changeItemSprint(e.item);
    } else if (e.action === 'delete') {
      this.deleteItem(e.item);
    }
  }
}
