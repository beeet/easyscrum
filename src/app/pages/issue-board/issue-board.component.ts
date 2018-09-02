import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssigneeService} from '../../services/assignee.service';
import {SprintService} from '../../services/sprint.service';
import {IssueState} from '../../services/issueState';
import {IssueType, IssueTypes} from '../../services/issueType';
import {IssuePriority} from '../../services/issuePriority';
import {IssueResolution} from '../../services/issueResolution';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Issue} from "../../services/issue";

@Component({
  selector: 'app-issue-board',
  templateUrl: './issue-board.component.html',
  styleUrls: ['./issue-board.component.scss']
})
export class IssueBoardComponent implements OnInit {
  currentIssue: Issue;
  issueStates = IssueState;
  issueTypes = IssueTypes;
  issuePriorities = IssuePriority;
  issueResolutions = IssueResolution;

  theForm: FormGroup;

  constructor(translate: TranslateService, private route: ActivatedRoute, router: Router,
              public issueService: IssueService, assigneeService: AssigneeService, public sprintService: SprintService,
  private formBuilder: FormBuilder) {}

  ngOnInit() {
    const urlParam = this.route.snapshot.paramMap.get('id');
    if (urlParam) {
      this.currentIssue = this.issueService.get(urlParam);
    } else {
      this.currentIssue = this.issueService.create();
      // TODO: remove
      this.currentIssue.type = IssueType.story;
    }

    this.theForm = this.formBuilder.group({
      'title': new FormControl(this.currentIssue.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30)
      ]),
      'sprint': new FormControl(this.currentIssue.sprintId, []),
      'description': new FormControl(this.currentIssue.description, [
        Validators.required,
        Validators.maxLength(3000)
      ]),
      'type': new FormControl(this.currentIssue.type, [
        Validators.required
      ])
    });
  }

  get title() { return this.theForm.get('title'); }
  get description() { return this.theForm.get('description'); }

  onSave() {
    console.log(this.theForm);
    console.log('raw', this.theForm.getRawValue());
    console.log('radio', this.theForm.get('type'));
    this.currentIssue.title = this.theForm.get('title').value;
    this.currentIssue.sprintId = this.theForm.get('sprint').value;
    this.currentIssue.description = this.theForm.get('description').value;
    this.currentIssue.type = this.theForm.get('type').value;
    console.log(this.currentIssue);
    // this.currentIssue = this.theForm.getRawValue(); TODO geht das ev. so einfacher?
    this.issueService.put(this.currentIssue);
    // this.router.navigate(['/sprint-backlog'])
    //   .catch(reason =>
    //     console.log('error while navigate to sprint-backlog' + JSON.stringify(reason))
    //   );
  }

  onCancel() {
  }

  onDelete() {
    this.issueService.delete(this.currentIssue.id);
  }
}
