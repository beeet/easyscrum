import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Sprint} from '../../services/sprint';
import {SprintService} from '../../services/sprint.service';
import {Issue} from '../../services/issue';
import {IssueService} from '../../services/issue.service';


@Component({
  selector: 'app-new-sprint',
  templateUrl: './new-sprint.component.html',
  styleUrls: ['./new-sprint.component.scss']
})
export class NewSprintComponent implements OnInit {
  sprint: Sprint;

  @Input() issue: Issue;

  constructor(public sprintService: SprintService,
              public issueService: IssueService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.sprint = this.sprintService.create();
  }

  save(): void {
    this.sprintService.put(this.sprint);
    if (this.issue) {
      this.issue.sprintId = this.sprint.id;
      this.issueService.put(this.issue);
    }
    this.activeModal.close(this.sprint);
  }

  cancel(): void {
    this.activeModal.dismiss('canceled');
  }
}
