import {Component} from '@angular/core';
import {IssueService} from '../../services/issue.service';
import {SprintService} from '../../services/sprint.service';

@Component({
  selector: 'app-product-backlog',
  templateUrl: './product-backlog.component.html',
  styleUrls: ['./product-backlog.component.scss']
})
export class ProductBacklogComponent {
  issues;
  nextIssues;
  nextIssuesEstimated = 0;
  sprints;
  selectedSprint;
  nextSprint;
  tableColumns = ['type', 'title', 'priority', 'estimated'];
  customSort = false;

  constructor(public issueService: IssueService,
              public sprintService: SprintService) {
    this.issues = this.issueService.getAllWithoutSprintAssignment();
    this.sprints = this.sprintService.getAll();
    this.nextSprint = this.sprintService.getNext();
    if (this.nextSprint) {
      this.nextIssues = this.issueService.getAllFilteredBySprint(this.nextSprint.id);
      this.nextIssues.forEach(i => this.nextIssuesEstimated += i.estimated);
    }
    this.selectedSprint = 'default';
  }

  changeSprint(value) {
    this.selectedSprint = value;
    if (this.selectedSprint !== 'default') {
      this.issues = this.issueService.getAllFilteredBySprint(this.selectedSprint);
    } else {
      this.issues = this.issueService.getAllWithoutSprintAssignment();
    }
  }

  changeCustomSort() {
    this.customSort = !this.customSort;
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
