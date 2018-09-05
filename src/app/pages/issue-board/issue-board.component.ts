import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from '../../services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';
import {AssigneeService} from '../../services/assignee.service';
import {SprintService} from '../../services/sprint.service';
import {IssueState} from '../../services/issueState';
import {IssueType} from '../../services/issueType';
import {IssuePriority} from '../../services/issuePriority';
import {IssueResolution} from '../../services/issueResolution';

@Component({
  selector: 'app-issue-board',
  templateUrl: './issue-board.component.html',
  styleUrls: ['./issue-board.component.scss']
})
export class IssueBoardComponent implements OnInit {
  private translate;
  private route: ActivatedRoute;
  private router: Router;
  currentIssue;
  issueStates = IssueState;
  issueTypes = IssueType;
  issuePriorities = IssuePriority;
  issueResolutions = IssueResolution;
  issueService;
  assigneeService;
  sprintService;
  isAssigneeEditable: boolean;
  newAssignee: string;

  constructor(translate: TranslateService, route: ActivatedRoute, router: Router,
              issueService: IssueService, assigneeService: AssigneeService, sprintService: SprintService) {
    this.translate = translate;
    this.route = route;
    this.router = router;
    this.issueService = issueService;
    this.assigneeService = assigneeService;
    this.sprintService = sprintService;
  }


  ngOnInit() {
    this.isAssigneeEditable = false;
    const urlParam = this.route.snapshot.paramMap.get('id');
    if (urlParam) {
      this.currentIssue = this.issueService.get(urlParam);
    } else {
      this.currentIssue = this.issueService.create();
    }
  }

  onSave() {
    this.issueService.put(this.currentIssue);
    this.router.navigate(['/sprint-backlog'])
      .catch(reason =>
        console.log('error while navigate to sprint-backlog' + JSON.stringify(reason))
      );
  }

  onCancel() {
  }

  onDelete() {
    this.issueService.delete(this.currentIssue.id);
  }

  addAssignee() {
    this.isAssigneeEditable = true;
    return this.isAssigneeEditable;
  }

  saveAssignee() {
    if (this.newAssignee && this.newAssignee !== '') {
      const assignee = this.assigneeService.create();
      assignee.nickname = this.newAssignee;
      this.assigneeService.put(assignee);
      this.currentIssue.assigneeId = assignee.id;
    }
    this.isAssigneeEditable = false;
    return this.isAssigneeEditable;
  }
}
