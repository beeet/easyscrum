import _ from 'lodash';
import {Component, DoCheck, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {IssueService} from '../../services/issue.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AssigneeService} from '../../services/assignee.service';
import {SprintService} from '../../services/sprint.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Issue} from '../../services/issue';
import {IssuePriority, IssueResolution, IssueState, IssueType} from '../../services/Enums';
import {NewSprintComponent} from '../../directives/new-sprint/new-sprint.component';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {NewIssueLinkComponent} from '../../directives/new-issue-link/new-issue-link.component';
import {IssueLink} from '../../services/IssueLink';

@Component({
  selector: 'app-issue-board',
  templateUrl: './issue-board.component.html',
  styleUrls: ['./issue-board.component.scss']
})
export class IssueBoardComponent implements OnInit, DoCheck {
  currentIssue: Issue;
  issueStates = IssueState.IssueStates;
  done = IssueState.done;
  issueTypes = IssueType.IssueTypes;
  issuePriorities = IssuePriority.IssuePriorities;
  issueResolutions = IssueResolution.IssueResolutions;

  isAssigneeEditable: boolean;
  newAssignee: string;

  theForm: FormGroup;

  tempIssue: boolean;
  canMakeNewIssues: boolean;

  readonly titleMaxLength = 100;
  readonly titleMinLength = 3;
  readonly descriptionMaxLength = 3000;

  private urlParam;
  private resetValues;

  issueLinksCollapsed = true;

  constructor(public issueService: IssueService,
              public assigneeService: AssigneeService,
              public sprintService: SprintService,
              private route: ActivatedRoute,
              private router: Router,
              private location: Location,
              private formBuilder: FormBuilder,
              private modalService: NgbModal) {
  }

  ngDoCheck() {
    const urlParamTemp = this.route.snapshot.paramMap.get('id');
    if (urlParamTemp !== this.urlParam) {
      this.init();
    }
  }

  ngOnInit() {
    this.init();
  }

  private init() {
    this.urlParam = this.route.snapshot.paramMap.get('id');
    this.isAssigneeEditable = false;
    this.tempIssue = false;
    this.canMakeNewIssues = false;
    if (this.urlParam) {
      this.currentIssue = this.issueService.get(this.urlParam);
      if (!this.currentIssue) {
        // es gibt kein Issue mit dieser ID
        this.currentIssue = this.issueService.create();
        this.tempIssue = true;
        this.canMakeNewIssues = true;
      }
    } else {
      this.currentIssue = this.issueService.create();
      this.tempIssue = true;
      this.canMakeNewIssues = true;
    }

    const state = new FormControl(this.currentIssue.state.id, [
      Validators.required
    ]);
    const resolution = new FormControl({
      value: _.get(this.currentIssue, 'resolution.id'),
      disabled: this.currentIssue.state !== this.done
    });
    const sprintId = new FormControl({
      value: this.currentIssue.sprintId,
      disabled: this.currentIssue.state === this.done
    });

    this.theForm = this.formBuilder.group({
      title: new FormControl(this.currentIssue.title, [
        Validators.required,
        Validators.minLength(this.titleMinLength),
        Validators.maxLength(this.titleMaxLength)
      ]),
      sprintId,
      description: new FormControl(this.currentIssue.description, [
        Validators.required,
        Validators.maxLength(this.descriptionMaxLength)
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

    this.resetValues = this.theForm.value;

    this.onChanges(state, resolution, sprintId);
  }

  get title() {
    return this.theForm.get('title');
  }

  get description() {
    return this.theForm.get('description');
  }

  get stateGroup() {
    return this.theForm.get('stateGroup');
  }

  getIssue(id: string): Issue {
    return this.issueService.get(id);
  }

  onChanges(state, resolution, sprint): void {
    state.valueChanges.subscribe(val => {
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
    const values = this.theForm.value;
    this.currentIssue.title = values.title;
    // wenn der Sprint disabled ist, ist er nicht in den values drin
    this.currentIssue.sprintId = values.sprintId || this.currentIssue.sprintId;
    this.currentIssue.description = values.description;
    this.currentIssue.type = IssueType.get(values.type);
    this.currentIssue.assigneeId = values.assigneeId;
    this.currentIssue.priority = IssuePriority.get(values.priority);
    this.currentIssue.dueDate = values.dueDate;
    this.currentIssue.state = IssueState.get(values.stateGroup.state);
    this.currentIssue.estimated = values.estimated;
    this.currentIssue.resolution = IssueResolution.get(values.stateGroup.resolution);
    this.currentIssue.elapsed = values.elapsed;

    this.issueService.put(this.currentIssue).then(() => {
        // Issue ist nun persistiert und es können Links erfasst werden.
        this.tempIssue = false;
        // navigieren falls nötig
        this.navigate();
      }
    );
  }

  onNew() {
    this.currentIssue = this.issueService.create();
    this.theForm.reset(this.resetValues);
  }

  onCancel() {
    this.theForm.reset(this.resetValues);
    this.navigate();
  }

  onDelete() {
    this.currentIssue.issueLinks.forEach(l => this.deleteIssueLink(l));
    this.issueService.delete(this.currentIssue.id);
    this.navigate();
  }

  private navigate(): void {
    if (this.urlParam) {
      this.location.back();
    }
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
      this.theForm.patchValue({assigneeId: this.currentIssue.assigneeId});
    }
    this.isAssigneeEditable = false;
    return this.isAssigneeEditable;
  }

  createNewSprint() {
    const modalRef = this.modalService.open(NewSprintComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.issue = this.currentIssue;
  }

  addIssueLink() {
    const modalRef = this.modalService.open(NewIssueLinkComponent,
      {
        size: 'lg'
      });
    modalRef.componentInstance.baseIssue = this.currentIssue;
  }

  deleteIssueLink(issueLink: IssueLink) {
    const relatedIssue = this.issueService.get(issueLink.relatedIssueId);
    this.currentIssue.removeIssueLink(issueLink.id);
    relatedIssue.removeIssueLink(issueLink.relatedIssueLinkId);
    this.issueService.putBulk(this.currentIssue, relatedIssue);
  }
}

function validateResolution(control: AbstractControl) {
  const state = control.get('state');
  const resolution = control.get('resolution');
  if (state.value === IssueState.done.id && !resolution.value) {
    return {invalidResolution: true};
  }
  return null;
}
