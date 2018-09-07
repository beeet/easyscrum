import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssigneeService} from '../../services/assignee.service';
import {SprintService} from '../../services/sprint.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../services/issue';
import {IssuePriority, IssueResolution, IssueState, IssueType} from '../../services/Enums';

@Component({
  selector: 'app-issue-board',
  templateUrl: './issue-board.component.html',
  styleUrls: ['./issue-board.component.scss']
})
export class IssueBoardComponent implements OnInit {
  currentIssue: Issue;
  issueStates = IssueState.IssueStates;
  done = IssueState.done;
  issueTypes = IssueType.IssueTypes;
  issuePriorities = IssuePriority.IssuePriorities;
  issueResolutions = IssueResolution.IssueResolutions;
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

    const state = new FormControl(this.currentIssue.state.id, [
      Validators.required
    ]);
    const resolution = new FormControl({
      value: this.currentIssue.resolution.id,
      disabled: this.currentIssue.state !== this.done
    });
    const sprintId = new FormControl({
      value: this.currentIssue.sprintId,
      disabled: this.currentIssue.state === this.done
    });

    this.theForm = this.formBuilder.group({
      title: new FormControl(this.currentIssue.title, [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(300)
      ]),
      sprintId,
      description: new FormControl(this.currentIssue.description, [
        Validators.required,
        Validators.maxLength(30000)
      ]),
      type: new FormControl(this.currentIssue.type.id, [
        Validators.required
      ]),
      assigneeId: new FormControl(this.currentIssue.assigneeId),
      priority: new FormControl(this.currentIssue.priority.id),
      dueDate: new FormControl(this.currentIssue.dueDate),
      stateGroup: new FormGroup({
          state,
          resolution
        }, [validateResolution]
      ),
      estimated: new FormControl(this.currentIssue.estimated, [
        Validators.min(0)
      ]),
      elapsed: new FormControl(this.currentIssue.elapsed, [
        Validators.min(0)
      ])
    });

    this.onChanges(state, resolution, sprintId);
  }

  get title() { return this.theForm.get('title'); }
  get description() { return this.theForm.get('description'); }
  get stateGroup() {
    return this.theForm.get('stateGroup');
  }

  onChanges(state, resolution, sprint): void {
    state.valueChanges.subscribe(val => {
      console.log(`My new state is ${val}.`);
      if (val === this.done.id) {
        resolution.enable();
        sprint.disable();
      } else {
        sprint.enable();
        resolution.disable();
        resolution.setValue(undefined);
        this.currentIssue.resolution = undefined;
      }
    });
  }

  onSave() {
    console.log(this.theForm);
    console.log('raw', this.theForm.getRawValue());
    // hier werden alle Eingabewerte aus dem Formular ans aktuelle Issue übergeben. Dazu müssen die Felder im Form genau gleich heissen wie
    // in der Issue Klasse
    this.currentIssue = Object.assign(this.currentIssue, this.theForm.getRawValue());
    this.issueService.put(this.currentIssue);
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

function validateResolution(control: AbstractControl) {
  const state = control.get('state');
  const resolution = control.get('resolution');

  if (state.value === IssueState.done && !resolution.value) {
    return { invalidResolution: true };
  }

  return null;
}
