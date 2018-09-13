import {Component} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {Router} from '@angular/router';
import {SprintService} from '../../services/sprint.service';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent {
  issueService: IssueService;
  sprintService: SprintService;
  issues;
  nextIssues;
  nextIssuesEstimated = 0;
  sprints;
  selectedSprint;
  nextSprint;
  tableColumns = ['type', 'title', 'priority', 'estimated'];
  contextmenuActions = [
    {action: 'edit', icon: 'edit'},
    {action: 'change', icon: 'rotate_left'},
    {action: 'delete', icon: 'close'}
  ];

  constructor(issueService: IssueService, sprintService: SprintService, private router: Router) {
    this.issueService = issueService;
    this.sprintService = sprintService;
    this.issues = this.issueService.getAllWithoutSprintAssignment();
    this.sprints = this.sprintService.getAll();
    this.nextSprint = this.sprintService.getNext();
    this.nextIssues = this.issueService.getAllFilteredBySprint(this.nextSprint.id);
    this.nextIssues.forEach(i => this.nextIssuesEstimated += i.estimated);
    this.selectedSprint = 'default';
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
    if (e.action === 'edit') {
      this.editItem(e.item);
    } else if (e.action === 'change') {
      this.changeItemSprint(e.item);
    } else if (e.action === 'delete') {
      this.deleteItem(e.item);
    }
  }

  changeSprint(value) {
    this.selectedSprint = value;
    if (this.selectedSprint !== 'default') {
      this.issues = this.issueService.getAllFilteredBySprint(this.selectedSprint);
    } else {
      this.issues = this.issueService.getAllWithoutSprintAssignment();
    }
  }

  sprintBackward() {
    const index = this.sprints.findIndex(s => s.id === this.selectedSprint);
    if (index > 0) {
      this.changeSprint(this.sprints[index - 1].id);
    } else if (this.selectedSprint === 'default') {
      this.changeSprint(this.sprints[this.sprints.length - 1].id);
    } else {
      this.changeSprint('default');
    }
  }

  sprintForward() {
    const index = this.sprints.findIndex(s => s.id === this.selectedSprint);
    if (index + 1 < this.sprints.length) {
      this.changeSprint(this.sprints[index + 1].id);
    } else {
      this.changeSprint('default');
    }
  }
}
