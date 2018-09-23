import {Component, Input, OnInit} from '@angular/core';
import {SprintService} from '../../services/sprint.service';
import {Sprint} from '../../services/sprint';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Issue} from '../../services/issue';
import {IssueService} from '../../services/issue.service';

@Component({
  selector: 'app-set-sprint',
  templateUrl: './set-sprint.component.html',
  styleUrls: ['./set-sprint.component.scss']
})
export class SetSprintComponent implements OnInit {
  sprintId;
  sprints;

  @Input() issue: Issue;

  constructor(public sprintService: SprintService,
              public issueService: IssueService,
              public activeModal: NgbActiveModal) {
    this.sprints = sprintService.getAll();
  }

  ngOnInit(): void {
    if (this.issue.sprintId) {
      this.sprintId = this.issue.sprintId;
    }
  }

  save(): void {
    if (this.sprintId) {
      this.issue.sprintId = this.sprintId;
      this.issueService.put(this.issue);
    }
    this.activeModal.close();
  }

  cancel(): void {
    this.activeModal.dismiss('canceled');
  }
}
