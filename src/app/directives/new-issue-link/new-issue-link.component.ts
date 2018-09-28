import {Component, Input, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';

import {Issue} from '../../services/issue';
import {IssueService} from '../../services/issue.service';
import {IssueLinkPair, IssueLinkType} from '../../services/IssueLink';


@Component({
  selector: 'app-new-issue-link',
  templateUrl: './new-issue-link.component.html',
  styleUrls: ['./new-issue-link.component.scss']
})
export class NewIssueLinkComponent implements OnInit {
  issueLinkTypes = IssueLinkType.issueLinkTypes;
  issues: Issue[];
  issueLinkTypeString: string;
  relatedIssueId: string;

  @Input() baseIssue: Issue;

  constructor(public issueService: IssueService,
              public activeModal: NgbActiveModal) {
  }

  ngOnInit(): void {
    this.issues = this.issueService.getAll();
  }

  save(): void {
    const issueLinkPair = new IssueLinkPair(this.issueLinkTypeString, this.baseIssue.id, this.relatedIssueId);
    this.baseIssue.issueLinks.push(issueLinkPair.baseIssueLink);
    const relatedIssue = this.issueService.get(this.relatedIssueId);
    relatedIssue.issueLinks.push(issueLinkPair.relatedIssueLink);
    this.issueService.putBulk(this.baseIssue, relatedIssue);
    this.activeModal.close(this.baseIssue);
  }

  cancel(): void {
    this.activeModal.dismiss('canceled');
  }
}
