import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssigneeService} from '../../services/assignee.service';
import {SprintService} from '../../services/sprint.service';
import {IssueState} from '../../services/issueState';
import {IssuePriorities, IssueResolutions, IssueStates, IssueType, IssueTypes} from '../../services/issueType';
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
  issueStates = IssueStates;
  issueTypes = IssueTypes;
  issuePriorities = IssuePriorities;
  issueResolutions = IssueResolutions;
  isAssigneeEditable: boolean;
  newAssignee: string;

  theForm: FormGroup;

  constructor(translate: TranslateService, private route: ActivatedRoute, router: Router,
              public issueService: IssueService, public assigneeService: AssigneeService, public sprintService: SprintService,
  private formBuilder: FormBuilder) {}

  ngOnInit() {
    this.isAssigneeEditable = false;
    const urlParam = this.route.snapshot.paramMap.get('id');
    if (urlParam) {
      this.currentIssue = this.issueService.get(urlParam);
    } else {
      this.currentIssue = this.issueService.create();
    }

    this.theForm = this.formBuilder.group({
      title: new FormControl(this.currentIssue.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300)
      ]),
      sprintId: new FormControl(this.currentIssue.sprintId, []),
      description: new FormControl(this.currentIssue.description, [
        Validators.required,
        Validators.maxLength(30000)
      ]),
      type: new FormControl(this.currentIssue.type, [
        Validators.required
      ]),
      assigneeId: new FormControl(this.currentIssue.assigneeId, []),
      priority: new FormControl(this.currentIssue.priority, []),
      dueDate: new FormControl(this.currentIssue.dueDate, []),
      state: new FormControl(this.currentIssue.state, []),
      estimated: new FormControl(this.currentIssue.estimated, [
        Validators.min(0)
      ]),
      resolution: new FormControl({
        name: this.currentIssue.resolution,
        disabled: true
      }, []),
      elapsed: new FormControl(this.currentIssue.elapsed, [
        Validators.min(0)
      ])
    });
  }

  get title() { return this.theForm.get('title'); }
  get description() { return this.theForm.get('description'); }
  get state() { return this.theForm.get('state').value; }

  onSave() {
    const a = this.state;
    console.log(this.theForm);
    console.log('raw', this.theForm.getRawValue());
    console.log('currentIssue1', this.currentIssue.title);
    this.currentIssue = Object.assign(this.currentIssue, this.theForm.getRawValue());
    console.log('currentIssue2', this.currentIssue.title);
    // this.currentIssue.title = this.theForm.get('title').value;
    // this.currentIssue.sprintId = this.theForm.get('sprint').value;
    // this.currentIssue.description = this.theForm.get('description').value;
    // this.currentIssue.type = this.theForm.get('type').value;
    // console.log('currentIssue', this.currentIssue);
    this.issueService.put(this.currentIssue);
    console.log('saved', this.issueService.getAll());
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
