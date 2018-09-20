import {Component, Input, OnInit} from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Issue} from '../../services/issue';
import {IssueService} from '../../services/issue.service';
import {IssueLink, IssueLinkType} from '../../services/IssueLink';


@Component({
  selector: 'app-new-issue-link',
  templateUrl: './new-issue-link.component.html',
  styleUrls: ['./new-issue-link.component.scss']
})
export class NewIssueLinkComponent implements OnInit {
  issueLinkTypes = IssueLinkType.issueLinkTypes;
  issueLinkTypeString: string;
  issues: Issue[];
  relatedIssueId: string;

  @Input() baseIssue: Issue;

  constructor(public issueService: IssueService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.issues = this.issueService.getAll();
  }

  save(): void {
    const issueLinkType = IssueLinkType.getIssueLinkType(this.issueLinkTypeString);
    this.baseIssue.issueLinks.push(new IssueLink(this.relatedIssueId, issueLinkType.type));
    const relatedIssue = this.issueService.get(this.relatedIssueId);
    relatedIssue.issueLinks.push(new IssueLink(this.baseIssue.id, issueLinkType.counterType));
    this.issueService.put(this.baseIssue);
    this.issueService.put(relatedIssue);
    this.activeModal.close(this.baseIssue);
  }

  cancel(): void {
    this.activeModal.dismiss('canceled');
  }
}
