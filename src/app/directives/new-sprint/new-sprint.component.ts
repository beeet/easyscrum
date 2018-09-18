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
  sprintService: SprintService;
  sprint: Sprint;
  issueService: IssueService;
  activeModal: NgbActiveModal;

  @Input() issue: Issue;

  constructor(sprintService: SprintService,
              issueService: IssueService,
              activeModal: NgbActiveModal) {
    this.sprintService = sprintService;
    this.issueService = issueService;
    this.activeModal = activeModal;
  }

  ngOnInit(): void {
    this.sprint = this.sprintService.create();
  }

  save(): void {
    this.sprintService.put(this.sprint);
    this.issue.sprintId = this.sprint.id;
    this.issueService.put(this.issue);
    this.activeModal.close(this.sprint);
  }

  cancel(): void {
    this.activeModal.dismiss('canceled');
  }
}
